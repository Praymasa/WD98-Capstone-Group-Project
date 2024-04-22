import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";

const bestEmployee = [
  {
    name: "Magdalena Magda",
    image: "../../public/Images/magda.jpg",
    position: "Housekeeper",
    recommendation: `"I highly recommend Ms. Magda for their exceptional work ethic, professionalism, and strong dedication to delivering high-quality results. Their attention to detail and ability to meet deadlines consistently impressed our team. Ms. Magda is a valuable asset to any organization."`,
  },
  {
    name: "Henry Ruiz",
    image: "../../public/Images/henry.jpg",
    position: "Nanny/Baby Sitter",
    recommendation: `"I wholeheartedly recommend Mr. Henry as a nanny. His nurturing nature, dependability, and exceptional childcare skills make him an outstanding caregiver. He creates a safe and engaging environment for children and establishes a strong bond with them. Henry is truly an asset in providing exceptional care and support to families."`,
  },
  {
    name: "Natalie Belardo",
    image: "../../public/Images/natalie.jpg",
    position: "Nanny/Baby Sitter",
    recommendation: `"I wholeheartedly recommend Mr. Henry as a nanny. His nurturing nature, dependability, and exceptional childcare skills make him an outstanding caregiver. He creates a safe and engaging environment for children and establishes a strong bond with them. Henry is truly an asset in providing exceptional care and support to families."`,
  },
];

export default function EmployeeRecomendation() {
  return (
    <Grid container spacing={2}>
      {bestEmployee.map((member, index) => (
        <Grid item xs={12} sm={4} key={index}>
          <Card
            key={index}
            variant="outlined"
            sx={{ mb: 2, height: "100%", backgroundColor: "#dccfdf80" }}
          >
            <Box sx={{ position: "relative" }}>
              <CardMedia
                component="img"
                height="350px"
                image={member.image}
                alt={member.name}
                sx={{ zIndex: 1 }}
              />
              <CardContent
                sx={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  zIndex: 2,
                  color: "#fff",
                  width: "100%",
                  background: "rgba(0, 0, 0, 0.6)",
                  padding: "10px",
                }}
              >
                <Typography variant="h6">{member.name}</Typography>
                <Typography variant="body1">{member.position}</Typography>
              </CardContent>
            </Box>
            <CardContent>
              <Typography variant="body1">{member.recommendation}</Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
