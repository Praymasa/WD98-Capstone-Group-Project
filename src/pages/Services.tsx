import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
  Button,
} from "@mui/material";
import Diversity2Icon from "@mui/icons-material/Diversity2";
import BannerCarousel from "../components/BannerCarousel";
import Housekeeping from "../../public/Images/housekeeping/cleaning-shape.png";
import Stepper from "../components/Stepper";
import React from "react";

export default function Services() {
  const [open, setOpen] = React.useState(false);
  const typesOfNannies = [
    {
      image: "../../public/Images/ChildCare/full-time-nanny.png",
      title: "Full-Time Nanny",
      description:
        "Stay-in nanny will reside in your home and render to your tasks together with ensuring they will get their proper accommodation. The Stay-out nanny comes at your preferred time rendering 8 hours service.",
    },
    {
      image: "../../public/Images/ChildCare/part-time-nanny.avif",
      title: "Part-Time Nanny",
      description: `When you find yourself stuck in traffic or simply just need some "me" time. We offer our part-time services to look after your kids for 3 hours and up.`,
    },
    {
      image: "../../public/Images/ChildCare/day-helper-nanny.jpg",
      title: "Day Helper Nanny",
      description:
        "Out for work during the day but got no one to look after your kid at home? No worries! Our day watch leaves you worry-free from 7 am-7 pm every weekday.",
    },
    {
      image: "../../public/Images/ChildCare/Date Night Sitter.jpg",
      title: "Date Night Nanny",
      description:
        "Available from 7 pm-7 am intended for parents who have been longing time alone to go to the movies or for a romantic date! Our night watch nannies, put your kids to bed right after giving them their needs.",
    },
    {
      image: "../../public/Images/ChildCare/tutoring nanny.jpeg",
      title: "Tutoring Nanny",
      description:
        "Sometimes, our daily job requires us to put in the extra hour. With our tutorial sitter, we can help you tutor your kids when they come home from school while you are still at work.",
    },
    {
      image: "../../public/Images/ChildCare/special needs nanny.webp",
      title: "Nanny for Special Needs",
      description:
        "Presenting our Special Needs Package. We have trained and licensed nannies who will be able to give the best care for your child.",
    },
    {
      image: "../../public/Images/ChildCare/temp-nanny.jpg",
      title: "Tempory Nanny",
      description:
        "When you need a Nanny only for a few weeks to 3 months, we can provide you a temporary service Stay-In or Stay-Out.",
    },
    {
      image: "../../public/Images/ChildCare/vacation nanny.jpg",
      title: "Vacation Nanny",
      description:
        "We all know what it feels like to go on vacations with our little ones sometimes. Travel around with an extra pair of hands to help you enjoy traveling hassle-free",
    },
  ];
  return (
    <>
      <BannerCarousel />
      <Box id="housekeeping" p={5}>
        <Container>
          <Box>
            <Typography
              variant="h4"
              className="bottom-line"
              textAlign={"center"}
              marginBottom={5}
            >
              <b>
                <span>H</span>ousekeeping <span>S</span>ervice
              </b>
            </Typography>
            <Grid
              container
              spacing={3}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Grid item xs={12} md={6}>
                <Avatar
                  variant="square"
                  src={Housekeeping}
                  sx={{ width: "100%", height: "100%" }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="body1" marginBottom={2}>
                  Is cleaning the house getting lost on your endless to-do list?
                  We understand that your busy schedule often leaves little room
                  for regular cleaning. Housekeeping services from our dedicated
                  team of professionals ensure your living space is spotless and
                  refreshing, providing you with the comfort and peace you
                  desire. Your search for professional cleaning services near
                  you ends when you contact{" "}
                  <b>
                    <span>Y</span>our<span>B</span>est Care
                  </b>
                  .
                </Typography>
                <Typography variant="body1" marginBottom={2}>
                  Since 2020, customers have welcomed the trusted cleaning
                  professionals from locally owned and operated businesses into
                  their homes. We’ve provided cleaning services to over a
                  million customers, and want you to know that you can continue
                  to rely on us to go above and beyond to provide you with a
                  worry-free, top-notch cleaning service every time.
                </Typography>
                <Typography variant="body1" marginBottom={2}>
                  Taking care of homes and those in them is what we do best. We
                  firmly believe a healthy home is a clean home!
                </Typography>
              </Grid>
            </Grid>
          </Box>

          <Box my={5}>
            <Typography variant="h4" textAlign={"center"} marginBottom={5}>
              <span>O</span>ur <span>A</span>pproach : Custome Cleaning
            </Typography>
            <Typography variant="body1" textAlign={"center"} marginBottom={5}>
              Are you tired of struggling to keep up with cleaning your home
              amidst a busy schedule? Look no further than{" "}
              <b>
                <span>Y</span>our<span>B</span>est Care
              </b>
              custom cleaning services. Our team understands that maintaining a
              well-cleaned home can be a challenge, especially when you have a
              packed calendar. That's why we offer custom cleaning services
              designed to meet your unique needs and preferences.
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Typography variant="body1" marginBottom={3}>
                  <Diversity2Icon color="secondary" />
                  &nbsp; <b>Residential Cleaning</b>: This type of cleaning
                  service focuses on cleaning and tidying up homes, including
                  bedrooms, bathrooms, kitchens, living areas, and other areas
                  of the house.
                </Typography>
                <Typography variant="body1" marginBottom={3}>
                  <Diversity2Icon color="secondary" />
                  &nbsp; <b>Commercial Cleaning</b>: Cater to businesses and
                  commercial spaces, such as offices, retail stores,
                  restaurants, and warehouses. They typically involve cleaning
                  common areas, workspaces, and ensuring a clean and hygienic
                  environment for employees and customers.
                </Typography>
                <Typography variant="body1" marginBottom={3}>
                  <Diversity2Icon color="secondary" />
                  &nbsp; <b>Carpet Cleaning</b>: Specialize in deep-cleaning
                  carpets, removing stains, dirt, and allergens. They often use
                  specialized equipment, such as steam cleaners or dry cleaning
                  methods, to restore the carpet's cleanliness and appearance.
                </Typography>
                <Typography variant="body1" marginBottom={3}>
                  <Diversity2Icon color="secondary" />
                  &nbsp; <b>Window Cleaning</b>: Focus on cleaning and
                  maintaining windows, both interior and exterior. They may
                  involve the use of professional tools and techniques to
                  achieve streak-free, crystal-clear windows.
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="body1" marginBottom={3}>
                  <Diversity2Icon color="secondary" />
                  &nbsp; <b>Deep Cleaning</b>: Provide a thorough and
                  comprehensive cleaning of a space, targeting hard-to-reach
                  areas, hidden dirt, and grime. It often involves cleaning
                  areas that are not typically cleaned during regular cleaning
                  sessions, such as behind appliances, inside cabinets, and
                  under furniture.
                </Typography>
                <Typography variant="body1" marginBottom={3}>
                  <Diversity2Icon color="secondary" />
                  &nbsp; <b>Move-in/Move-out Cleaning</b>: These services cater
                  to individuals or businesses moving into or out of a property.
                  The cleaning includes a thorough cleaning of the entire space,
                  ensuring it is ready for the next occupants or for the new
                  residents to move in.
                </Typography>
                <Typography variant="body1" marginBottom={3}>
                  <Diversity2Icon color="secondary" />
                  &nbsp; <b>Post-Construction Cleaning</b>: Focus on cleaning up
                  after a construction or renovation project. They involve
                  removing dust, debris, and construction-related mess from the
                  site, making it clean and presentable.
                </Typography>
                <Typography variant="body1" marginBottom={3}>
                  <Diversity2Icon color="secondary" />
                  &nbsp; <b>Specialized Cleaning</b>: Cover specific cleaning
                  needs, such as upholstery cleaning, mattress cleaning, air
                  duct cleaning, and more. These services are tailored to
                  address specific cleaning requirements or unique items that
                  need professional attention.
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
      <Box id="childcare" p={5}>
        <Container>
          <Typography
            variant="h4"
            className="bottom-line"
            textAlign={"center"}
            marginBottom={5}
          >
            <b>
              <span>C</span>hild <span>C</span>are Service
            </b>
          </Typography>
          <Typography variant="body1" marginBottom={5} textAlign={"center"}>
            Find a nanny your kids will love. Over 5,000 families trust{" "}
            <b>
              <span>Y</span>our<span>B</span>est Care
            </b>{" "}
            to find child care that fits their needs
          </Typography>
          <Box>
            <Grid container spacing={2}>
              {typesOfNannies.map((nanny, index) => (
                <Grid item xs={12} sm={6} md={4} lg={3}>
                  <Card
                    sx={{
                      maxWidth: 345,
                      height: "100%",
                      backgroundColor: "#dccfdf80",
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="50%"
                      image={nanny.image}
                      alt={`image for ${nanny.title}`}
                    />
                    <CardContent>
                      <Typography
                        key={index}
                        gutterBottom
                        variant="h5"
                        component="div"
                      >
                        {nanny.title}
                      </Typography>
                      <Typography variant="body2">
                        {nanny.description}
                      </Typography>
                      <Button onClick={() => setOpen(true)}>Book Now</Button>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Container>
      </Box>
      <Box id="seniorcare" p={5}>
        <Container>
          <Typography
            variant="h4"
            className="bottom-line"
            textAlign={"center"}
            marginBottom={5}
          >
            <b>
              <span>S</span>enior <span>C</span>are Service
            </b>
          </Typography>
          <Box sx={{ backgroundColor: "#dccfdf80", p: 5 }}>
            <Typography variant="body1" textAlign={"center"} marginBottom={5}>
              We’ve had the privilege of providing in-home care to thousands of
              clients nationwide since YBCare was founded more than 4 years ago.
              Each of those clients has had their own set of unique needs, and
              we’ve worked with each one to develop and deliver a personalized
              care plan based on their health goals. Because YBCare offers a
              wide variety of services, we are able to easily modify your care
              plan and services should your needs change.
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography variant="h5" textAlign={"center"} gutterBottom>
                  Personal Care and Companionship Services
                </Typography>
                <Typography
                  variant="body1"
                  textAlign={"center"}
                  marginBottom={5}
                >
                  We aim to support seniors in maintaining their independence,
                  safety, and overall well-being while providing them with
                  personalized care and companionship. It is important to note
                  that the specific services provided may vary depending on the
                  individual needs and preferences of the senior.
                </Typography>
                <Box>
                  <Typography variant="body1" marginBottom={5}>
                    <Diversity2Icon color="secondary" />
                    &nbsp;{" "}
                    <b>Assistance with Activities of Daily Living (ADLs)</b>:
                    This includes help with tasks such as bathing, dressing,
                    grooming, toileting, and mobility assistance. Caregivers
                    provide support to ensure seniors can maintain their
                    personal hygiene and perform daily activities comfortably.
                  </Typography>
                  <Typography variant="body1" marginBottom={5}>
                    <Diversity2Icon color="secondary" />
                    &nbsp; <b>Medication Management</b>: Caregivers assist
                    seniors in managing their medications, including medication
                    reminders, organizing pillboxes, and ensuring medications
                    are taken at the prescribed times. They may also coordinate
                    with healthcare professionals to ensure proper medication
                    administration.
                  </Typography>
                  <Typography variant="body1" marginBottom={5}>
                    <Diversity2Icon color="secondary" />
                    &nbsp; <b>Companionship and Socialization</b>: Caregivers
                    provide companionship and engage in social activities with
                    seniors to reduce feelings of loneliness and isolation. They
                    may participate in conversations, play games, accompany
                    seniors on walks or outings, and provide emotional support.
                  </Typography>
                  <Typography variant="body1" marginBottom={5}>
                    <Diversity2Icon color="secondary" />
                    &nbsp; <b>Meal Preparation and Nutrition Support</b>:
                    Caregivers can help plan and prepare nutritious meals based
                    on dietary needs and preferences. They ensure that seniors
                    are receiving proper nutrition and hydration. They may also
                    assist with feeding if necessary.
                  </Typography>
                  <Typography variant="body1" marginBottom={5}>
                    <Diversity2Icon color="secondary" />
                    &nbsp; <b>Light Housekeeping</b>: Caregivers can help with
                    light housekeeping tasks, such as tidying up, dusting,
                    vacuuming, and laundry. They ensure that the living
                    environment is clean, organized, and comfortable for
                    seniors.
                  </Typography>
                  <Typography variant="body1" marginBottom={5}>
                    <Diversity2Icon color="secondary" />
                    &nbsp; <b>Transportation and Errands</b>: Caregivers can
                    provide transportation services, such as driving seniors to
                    medical appointments, grocery shopping, or social
                    activities. They may also assist with running errands,
                    picking up prescriptions, or accompanying seniors to
                    important appointments.
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="h5" textAlign={"center"} gutterBottom>
                  Private Duty Nursing Care Services
                </Typography>
                <Typography
                  variant="body1"
                  textAlign={"center"}
                  marginBottom={5}
                >
                  These private duty nursing services are tailored to meet the
                  unique healthcare needs of seniors. Private duty nurses work
                  closely with seniors and their families to develop a
                  personalized care plan that addresses their specific health
                  concerns and promotes their overall well-being.
                </Typography>
                <Box>
                  <Typography variant="body1" marginBottom={5}>
                    <Diversity2Icon color="secondary" />
                    &nbsp; <b>Medication Management</b>: Private duty nurses can
                    help seniors manage their medications by ensuring they take
                    the correct dosage at the right time. They can administer
                    medications, monitor for any adverse reactions, and
                    communicate with healthcare providers to ensure proper
                    medication management.
                  </Typography>
                  <Typography variant="body1" marginBottom={5}>
                    <Diversity2Icon color="secondary" />
                    &nbsp; <b>Wound Care</b>: Private duty nurses can provide
                    specialized wound care for seniors who have wounds or
                    ulcers. They assess the wound, clean and dress it
                    appropriately, monitor healing progress, and provide ongoing
                    care to prevent infection and promote healing.
                  </Typography>
                  <Typography variant="body1" marginBottom={5}>
                    <Diversity2Icon color="secondary" />
                    &nbsp; <b>Chronic Disease Management</b>: Private duty
                    nurses can assist seniors with chronic conditions, such as
                    diabetes, heart disease, or respiratory disorders. They can
                    help monitor vital signs, manage symptoms, provide education
                    on self-care, and coordinate with healthcare professionals
                    to ensure proper disease management.
                  </Typography>
                  <Typography variant="body1" marginBottom={5}>
                    <Diversity2Icon color="secondary" />
                    &nbsp; <b>Post-Surgery Care</b>: Private duty nurses can
                    provide specialized care for seniors who have undergone
                    surgery. They assist with post-operative wound care, pain
                    management, monitoring for complications, and ensuring a
                    smooth recovery process.
                  </Typography>
                  <Typography variant="body1" marginBottom={5}>
                    <Diversity2Icon color="secondary" />
                    &nbsp; <b>Rehabilitation Assistance</b>: Private duty nurses
                    can support seniors in their rehabilitation journey. They
                    can help with exercises, mobility assistance, and therapies
                    recommended by physical or occupational therapists. They
                    work closely with the healthcare team to facilitate the
                    senior's recovery and improve functional abilities.
                  </Typography>
                  <Typography variant="body1" marginBottom={5}>
                    <Diversity2Icon color="secondary" />
                    &nbsp; <b>Palliative and End-of-Life Care</b>: Private duty
                    nurses can provide compassionate care for seniors nearing
                    the end of their life or requiring palliative care. They
                    focus on pain management, symptom control, emotional
                    support, and ensuring the senior's comfort and dignity
                    during this stage of life.
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
      <Box p={5}>
        <Container>
          <Typography
            variant="h4"
            className="bottom-line"
            textAlign={"center"}
            marginBottom={5}
          >
            <b>
              <span>W</span>e're <span>H</span>ere For You at Every Step of The
              Process
            </b>
          </Typography>
          <Stepper />
        </Container>
      </Box>
    </>
  );
}
