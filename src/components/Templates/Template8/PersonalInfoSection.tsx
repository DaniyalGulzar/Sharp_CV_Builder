import { Text, View, Link } from "@react-pdf/renderer";
import { pdfStyles as styles } from "./styles";
import { customFormatPhoneNumber } from "@/utils/phone";

// Define components with display names outside of the switch statement
const TextComponent = ({ value }: { value: string }) => (
  <Text style={styles.contactInfo}>{value}</Text>
);
TextComponent.displayName = "TextComponent";

const PhoneComponent = ({ value }: { value: string }) => {
  const parsedPhoneNumber = customFormatPhoneNumber(value);
  return <Text style={styles.contactInfo}>{parsedPhoneNumber}</Text>;
};
PhoneComponent.displayName = "PhoneComponent";

const LinkedInComponent = ({ value }: { value: string }) => (
  <Link src={value} style={styles.contactInfo}>
    {/* LinkedIn */}
    {value}
  </Link>
);
LinkedInComponent.displayName = "LinkedInComponent";

const WebsiteComponent = ({ value }: { value: string }) => (
  <Link src={value} style={styles.contactInfo}>
    Website
  </Link>
);
WebsiteComponent.displayName = "WebsiteComponent";

const HeadingItem = ({
  index,
  type,
  value,
}: {
  index: number;
  type: string;
  value: string;
}) => {
  let Component: any;

  switch (type) {
    case "location":
    case "email":
    case "city":
    case "postalCode":
    case "country":
      Component = TextComponent;
      break;
    case "phone":
      Component = PhoneComponent;
      break;
    case "linkedin":
      Component = LinkedInComponent;
      break;
    case "website":
      Component = WebsiteComponent;
      break;
    default:
      return null;
  }

  return (
    <Text style={styles.contactInfo}>
      {index !== 0 && <Text style={styles.contactInfo}>&nbsp;|&nbsp;</Text>}
      <Component value={value} />
    </Text>
  );
};
HeadingItem.displayName = "HeadingItem"; // Adding display name to HeadingItem component

type Heading = {
  email: string;
  city?: string;
  country?: string;
  postalCode?: string;
  phone?: string;
  website?: string;
  linkedin?: string;
};

export const PersonalInfoSection = ({ resume }: { resume: any }) => {
  const headingKeys: (keyof Heading)[] = [
    "city",
    "country",
    "postalCode",
    "phone",
    "email",
    "linkedin",
    "website",
  ];
  const clientInfo = headingKeys.filter((key) => resume?.data?.heading?.[key]);

  return (
    <View style={styles.personalInfo}>
      <Text style={styles.name}>
        {resume?.data?.heading?.firstName} {resume?.data?.heading?.lastName}
      </Text>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {clientInfo.map((key, i) => {
          const value = resume?.data?.heading?.[key];
          if (value) {
            return (
              <HeadingItem index={i} key={i + key} type={key} value={value} />
            );
          }
          return null;
        })}
      </View>
    </View>
  );
};
PersonalInfoSection.displayName = "PersonalInfoSection"; // Adding display name to PersonalInfoSection component
