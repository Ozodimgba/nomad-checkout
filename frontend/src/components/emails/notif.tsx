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
              Happy registration day at <strong>{company}</strong>
            </Heading>
            <Text className="text-sm">
              Hello {name},
            </Text>
            <Text className="text-sm">
              We&apos;re excited to have you join us at <strong>{company}</strong>. Don&apos;t worry you&apos;ve been registered but due to an issue with our crypto to naira conversion partner that will be resolved before Wednesday we can&apos;t offer automatic off-ramps at the moment. We promise you will be notified immediately this is resolved for now logins are disabled.
            </Text>
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