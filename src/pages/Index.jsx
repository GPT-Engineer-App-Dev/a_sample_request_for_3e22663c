import React, { useState } from "react";
import { Box, Button, FormControl, FormLabel, Input, Textarea, Text, VStack, useToast } from "@chakra-ui/react";
import { FaPaperPlane, FaPrint } from "react-icons/fa";

const Index = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    trackingNumber: "",
    sampleInfo: "",
  });
  const [submittedData, setSubmittedData] = useState(null);
  const toast = useToast();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const generateUniqueNumber = () => {
    return Math.floor(100000 + Math.random() * 900000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const uniqueNumber = generateUniqueNumber();
    const trackingNumber = `CYKLOP-${uniqueNumber}`;
    setSubmittedData({ ...formData, uniqueNumber, trackingNumber });
    // TODO: Implement email automation to send form data to samplerequest@cyklop.nl
    toast({
      title: "Form submitted.",
      description: `Your tracking number is ${trackingNumber}. An email has been sent to you with the details.`,
      status: "success",
      duration: 5000,
      isClosable: true,
    });
    setFormData({
      name: "",
      email: "",
      trackingNumber: "",
      sampleInfo: "",
    });
  };

  const handlePrint = () => {
    const printContent = `
      <h2>Shipping Label</h2>
      <p>Cyklop CSC<br>
      Att.: SampleLab M.Slot [${submittedData.uniqueNumber}]<br>
      Wilhelm Röntgenstraat 10, 8013NC, Zwolle, Nederland</p>
    `;
    const printWindow = window.open("", "_blank");
    printWindow.document.open();
    printWindow.document.write(`
      <html>
        <head>
          <title>Shipping Label</title>
        </head>
        <body>
          ${printContent}
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <Box bg="#002F5D" minH="100vh" p={8} color="white">
      <Text fontSize="3xl" mb={8}>
        Sample Request Form
      </Text>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4} align="stretch">
          <FormControl isRequired>
            <FormLabel>Name</FormLabel>
            <Input type="text" name="name" value={formData.name} onChange={handleChange} bg="white" color="black" />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Email</FormLabel>
            <Input type="email" name="email" value={formData.email} onChange={handleChange} bg="white" color="black" />
          </FormControl>
          <FormControl>
            <FormLabel>Tracking Number</FormLabel>
            <Input type="text" name="trackingNumber" value={formData.trackingNumber} onChange={handleChange} bg="white" color="black" />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Sample Information</FormLabel>
            <Textarea name="sampleInfo" value={formData.sampleInfo} onChange={handleChange} bg="white" color="black" />
          </FormControl>
          <Button type="submit" bg="#6CB42C" _hover={{ bg: "#58941F" }} leftIcon={<FaPaperPlane />}>
            Submit
          </Button>
        </VStack>
      </form>
      {submittedData && (
        <Box mt={8}>
          <Text fontSize="xl" mb={4}>
            Form submitted successfully!
          </Text>
          <Text>
            Your unique number is: <strong>{submittedData.uniqueNumber}</strong>
          </Text>
          <Text>
            Your tracking number is: <strong>{submittedData.trackingNumber}</strong>
          </Text>
          <Button mt={4} bg="#6CB42C" _hover={{ bg: "#58941F" }} leftIcon={<FaPrint />} onClick={handlePrint}>
            Print Shipping Label
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default Index;
