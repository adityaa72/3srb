/* eslint-disable @typescript-eslint/no-use-before-define */
import { APP_LOGO, APP_NAME, APP_URL } from "@constants/app";
import { formatApiUrl } from "@/utils/fns";
import {
  Body,
  Container,
  Font,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Tailwind,
  Text,
} from "@react-email/components";
import Paragraph from "./Paragraph";

export type EmailDocumentProps = {
  preview: string;
  heading: string;
  content: React.ReactNode;
};

const EmailDocument =  ({
  preview,
  heading,
  content,
}: EmailDocumentProps) => {
  return (
    <Html>
      <Head>
        <Font
          fontFamily="Roboto"
          fallbackFontFamily="Verdana"
          webFont={{
            url: "https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2",
            format: "woff2",
          }}
          fontWeight={400}
          fontStyle="normal"
        />
      </Head>
      <Tailwind
        config={{
          theme: {
            extend: {
              colors: {
                primary: {
                  lighter: "#D6E4FF",
                  light: "#84A9FF",
                  main: "#3366FF",
                  dark: "#1939B7",
                  darker: "#091A7A",
                },
              },
            },
          },
        }}
      >
        <Preview>{preview}</Preview>
        <Body style={main} className="bg-slate-100 p-1">
          <Container className="rounded bg-white p-4">
            <Link href={APP_URL}>
              <Img src={formatApiUrl(APP_LOGO)} alt={APP_NAME} width={150} />
            </Link>
            <Heading className="text-primary-darker mt-10 font-sans font-bold">
              {heading}
            </Heading>
            {content}
            <strong>
              <Paragraph>
                Warm regards,
                <br />
                {"   "}
                {APP_NAME} Team
              </Paragraph>
            </strong>
          </Container>
          <Container>
            <Text className="text-primary-darker text-center text-sm">
              ©<Link href={APP_URL}>{APP_NAME}</Link> All Rights Reserved.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

const main: React.CSSProperties = {
  fontFamily: `-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif`,
};

export default EmailDocument;
