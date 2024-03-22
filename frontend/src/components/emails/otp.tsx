import * as React from 'react';
import { Body, Button, Container, Head, Heading, Html, Img, Preview, Section, Text, Tailwind } from '@react-email/components';

interface EmailTemplateProps {
  name: string;
  otpCode: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  name,
  otpCode
}) => {
  const company = 'Nomad'; // Replace 'Your Company' with your actual company name
  const username = name;
  const baseUrl = 'https://yourwebsite.com'; // Replace 'https://yourwebsite.com' with your actual base URL
  const previewText = `Welcome to ${company}, ${username}!`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="bg-white my-auto mx-auto font-sans">
          <Container className="my-10 mx-auto p-5 w-[465px]">
            <Section className="mt-8">
              <Img
                src={`https://bssofnnztxckmtgneuqm.supabase.co/storage/v1/object/public/images/Frame%2015%20(5).png`}
                width="80"
                height="80"
                alt="Logo Example"
                className="my-0 mx-auto"
              />
            </Section>
            <Heading className="text-2xl font-normal text-center p-0 my-8 mx-0">
              Confirm your email at <strong>{company}</strong>
            </Heading>
            <Text className="text-sm">
              Hello {name},
            </Text>
            <Text className="text-sm">
              We&apos;re excited to have you join us at <strong>{company}</strong>. But first you have to prove that you own this email. Remember Nomad will never ask you for this code outside our website no matter the circumstance, Stay Safe.
            </Text>
            <Section className="text-center mt-[32px] mb-[32px]">
              <Button
                className="px-6 py-3 bg-black text-[#fad883] text-xl font-semibold no-underline text-center"
              >
                {otpCode}
              </Button>
            </Section>
            <Text className="text-sm">
              Happy registration day,
              <br />
              The {company} Team
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};
