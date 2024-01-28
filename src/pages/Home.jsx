import React from "react";
import { Container, Typography, Grid, Paper, IconButton } from "@mui/material";
import { ThumbUp, ThumbDown, Comment } from "@mui/icons-material";

const Home = () => {
	return (
		<Container>
			<Typography variant="h4" marginLeft={"2.7rem"}>
				Latest Posts
			</Typography>
			<Grid container spacing={3}>
				{/* Map through posts and display them */}
				{/* Each post should have like/dislike, author, comments, etc. */}
				<Grid item xs={12} sm={6} md={4} lg={3}>
					<Paper
						style={{
							margin: "1rem",
							padding: "2rem",
							minWidth: "50vw",
						}}
					>
						<Typography variant="h6">Post Title</Typography>
						<Typography variant="body1">
							Lorem ipsum dolor sit amet, consectetur adipisicing
							elit. Deserunt culpa nesciunt, dignissimos beatae
							omnis accusamus consequuntur necessitatibus quos,
							consectetur eaque reprehenderit rerum explicabo non
							suscipit delectus, quam natus magnam distinctio.
							Fuga eum consequuntur est magnam dolorem omnis ea
							libero cum corporis nam. Voluptatem vitae
							reprehenderit harum quaerat. Tenetur perferendis
							officiis fuga possimus voluptas molestiae, quia enim
							quasi maiores expedita sapiente! Saepe laboriosam
							esse eos cum consequatur sed nulla dolorem hic
							voluptatibus iusto illo, nesciunt non rerum
							suscipit? Nulla vel fuga, quidem possimus
							exercitationem, minus corrupti laudantium recusandae
							veritatis ut accusamus!
						</Typography>

						<div style={{ display: "flex", alignItems: "center" }}>
							<IconButton color="secondary">
								<ThumbUp />
							</IconButton>
							<IconButton color="secondary">
								<ThumbDown />
							</IconButton>
							<IconButton color="primary">
								<Comment />
							</IconButton>
						</div>
						<Typography variant="subtitle2">
							Author: John Doe
						</Typography>
					</Paper>
				</Grid>
			</Grid>
		</Container>
	);
};

export default Home;
