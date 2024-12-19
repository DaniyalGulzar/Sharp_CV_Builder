type ResumeData = {
  result: {
    settings: {
      fontStyle: string;
      fontSize: string;
      lineSpacing: string;
      paragraphSpacing: string;
      sideMargin: string;
      color: string;
    };
    data: {
      contact: {
        address: string;
        email: string;
        contact: string;
        position: string;
        order: number;
      };
      summary: {
        value: string;
        position: string;
        order: number;
      };
      education: {
        data: Education[];
        position: string;
        order: number;
      };
      certification: {
        data: Certification[];
        position: string;
        order: number;
      };
      interest: {
        data: Interest[];
        position: string;
        order: number;
      };
      skill: {
        data: Skill[];
        position: string;
        order: number;
      };
      reference: {
        data: Reference[];
      };
      software: {
        data: Software[];
        position: string;
        order: number;
      };
      language: {
        data: Language[];
        position: string;
        order: number;
      };
      certificate: {
        data: Certificate[];
        position: string;
        order: number;
      };
      portfolio: {
        data: any[];
        position: string;
        order: number;
      };
      award: {
        data: any[];
        position: string;
        order: number;
      };
      accomplishment: {
        data: any[];
        position: string;
        order: number;
      };
      affiliation: {
        data: any[];
        position: string;
        order: number;
      };
      workHistory: {
        data: WorkHistory[];
        position: string;
        order: number;
      };
      heading: {
        firstName: string;
        lastName: string;
        profession: string;
        city: string;
        postalCode: string;
        country: string;
        phone: string;
        email: string;
      };
    };
    title: string;
    progress: number;
    user: string;
    template: string;
    _id: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
  message: string;
};

type Education = {
  schoolName: string;
  degree: string;
  fieldOfStudy: string;
  startMonth: string;
  startYear: string;
  endMonth: string;
  endYear: string;
  location1: string;
};

type Certification = {
  description: string;
  title: string;
  startMonth: string;
  startYear: string;
  endMonth: string;
  endYear: string;
};

type Interest = {
  description: string;
};

type Skill = {
  title: string;
  rating: string;
  level: string;
};

type Reference = {
  title: string;
  mail: string;
  phone: string;
  company: string;
};

type Software = {
  title: string;
  level: string;
};

type Language = {
  title: string;
  level: string;
};

type Certificate = {
  // Define fields for Certificate type when available
};

type WorkHistory = {
  jobTitle: string;
  employer: string;
  location: string;
  startMonth: string;
  startYear: string;
  endMonth: string;
  endYear: string;
  isCurrent: boolean;
  description: string;
};
