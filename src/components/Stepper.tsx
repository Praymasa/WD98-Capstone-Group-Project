import { Box, Container, Grid, Typography } from "@mui/material";
import React from "react";

export default function Stepper() {
  const steps = [
    {
      id: 1,
      title: "Assess Your Needs:",
      description:
        "Determine the specific services you require. For housekeeping, identify the tasks you need assistance with,such as cleaning, organizing, or laundry. For child care,consider the age of your child and the type of care needed, such as regular babysitting or full-time daycare. For senior care, assess the level of assistance required, such as personal care, medication management, or companionship.",
    },
    {
      id: 2,
      title: "Research and Select Service Providers:",
      description:
        "Conduct research to find reputable service providers in your area. Consider factors such as their experience, qualifications, reputation, and customer reviews. Narrow down your options and choose providers that align with your specific needs and preferences.",
    },
    {
      id: 3,
      title: "Schedule Consultations or Interviews: ",
      description:
        "Contact the selected service providers to schedule consultations or interviews. This allows you to discuss your requirements in detail, ask questions, and evaluate their suitability. During the consultations, inquire about their services, pricing, availability, qualifications of staff, and any specific protocols they follow.",
    },
    {
      id: 4,
      title: "Review Contracts and Agreements:",
      description:
        "Once you have selected a service provider, carefully review the contracts and agreements they provide. Pay attention to the terms and conditions, pricing structure, cancellation policies, and any additional fees. Ensure you have a clear understanding of the scope of services, expectations, and any limitations.",
    },
    {
      id: 5,
      title: "Start the Services and Provide Feedback:",
      description:
        "Once the contracts are finalized, the service provider will begin delivering the requested services. Stay in communication with the provider to address any concerns or modifications needed. Provide feedback on the quality of the services received to help the provider improve and ensure your ongoing satisfaction.",
    },
  ];
  return (
    <>
      <Box>
        <Container>
          <Grid container sx={{ display: "flex", justifyContent: "center" }}>
            {steps.map((step, index) => (
              <Grid item xs={12} sm={4}>
                <ol key={index}>
                  <dt>
                    <b>
                      {step.id}. {step.title}
                    </b>
                  </dt>
                  <dd>{step.description}</dd>
                </ol>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </>
  );
}
