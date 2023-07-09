import { IconMessage } from "@tabler/icons-react";
import React, { useEffect, useState } from "react";
import {
	Card,
	Image,
	Text,
	Group,
	Badge,
	Button,
	ActionIcon,
	createStyles,
	rem,
} from "@mantine/core";
import CvModel from "@/app/models/cv";
import link from "next/link";
import { URLSearchParams } from "next/dist/compiled/@edge-runtime/primitives/url";

const useStyles = createStyles((theme) => ({
	card: {
		backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
	},

	section: {
		borderBottom: `${rem(1)} solid ${
			theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
		}`,
		paddingLeft: theme.spacing.md,
		paddingRight: theme.spacing.md,
		paddingBottom: theme.spacing.md,
	},

	commentsButton: {
		color: theme.colors.red[6],
	},
}));

async function fetchImage(cv: CvModel): Promise<string> {
	const { documentLink, id } = cv;

	const response = await fetch(
		"/api/preview?" +
			new URLSearchParams({
				id: id,
				link: documentLink,
			})
	);
	if (!response.ok) {
		throw new Error("Failed to fetch image");
	}

	const blob = await response.blob();
	const imageUrl = URL.createObjectURL(blob);
	return imageUrl;
}

export default function CVCard({ cv }: { cv: CvModel }) {
	const { classes, theme } = useStyles();
	const [image, setImage] = useState<string | null>(null);
	useEffect(() => {
		const fetchImageData = async () => {
			try {
				const imageLink = await fetchImage(cv);
				setImage(imageLink);
			} catch (error) {
				console.error(error);
			}
		};
		fetchImageData();
	}, [cv]);

	return (
		<Card withBorder radius="md" p="md" className={classes.card}>
			<Card.Section>
				<Image src={image} height={400}  />
			</Card.Section>

			<Card.Section className={classes.section} mt="md">
				<Group position="apart">
					<Text fz="lg" fw={500}>
						{cv.documentLink}
					</Text>
					<Badge size="sm">{cv.categoryID}</Badge>
				</Group>
				<Text fz="sm" mt="xs">
					{cv.description}
				</Text>
			</Card.Section>

			<Group mt="xs">
				<Button radius="md" style={{ flex: 1 }}>
					Show details
				</Button>
				<ActionIcon variant="default" radius="md" size={36}>
					<IconMessage size="1.1em" className={classes.commentsButton} stroke={1.5} />
				</ActionIcon>
			</Group>
		</Card>
	);
}
