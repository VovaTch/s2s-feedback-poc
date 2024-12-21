export type langState = {
  id: string;
  name: string;
  svgPath: string;
  bgPath: string;
};

export const languageStates: langState[] = [
  {
    id: "es",
    name: "Spanish",
    svgPath: "/flags/spain.svg",
    bgPath: "/bg/bg_spain.jpg",
  },
  {
    id: "de",
    name: "German",
    svgPath: "/flags/germany.svg",
    bgPath: "/bg/bg_germany.jpg",
  },
  {
    id: "ru",
    name: "Russian",
    svgPath: "/flags/russia.svg",
    bgPath: "/bg/bg_russia.jpg",
  },
  {
    id: "cn",
    name: "Chinese",
    svgPath: "/flags/china.svg",
    bgPath: "/bg/bg_china.jpg",
  },
];
