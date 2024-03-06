import { Content } from "../types/embed";

type ToConvertContent = {
  type: string;
  url: string;
  tags: string;
};

export const convertToContent = ({
  type,
  url,
  tags,
}: ToConvertContent): Content => ({
  type,
  url,
  tags: tags
    .split(/\r?\n/)
    .filter((x) => !!x)
    .map((tag) => tag.trim()),
});
