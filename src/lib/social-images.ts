const ARCHIVE_OGRAPH_ROOT =
  "https://res.cloudinary.com/dk3rdh3yo/image/upload/v1790561581/dnd_ograph_a2t8ck.png";

function encodeText(value: string): string {
  return encodeURIComponent(value.toLocaleUpperCase("en-US"))
    .replace(/%2C/g, "%252C")
    .replace(
      /[!'()*]/g,
      (character) =>
        `%${character.charCodeAt(0).toString(16).toUpperCase()}`,
    );
}

export interface ArchiveSocialImage {
  date: Date;
  title: string;
  linkCount: number;
}

export function buildArchiveSocialImage({
  date,
  title,
  linkCount,
}: ArchiveSocialImage): string {
  const normalizedTitle = title
    .split(/\r?\n/)
    .map((line) => line.trim().replace(/\s+/g, " "))
    .filter(Boolean)
    .join("\n");
  if (!normalizedTitle) {
    throw new Error("An archive social image title cannot be empty.");
  }
  if (!Number.isInteger(linkCount) || linkCount < 0) {
    throw new RangeError("Archive social image link count cannot be negative.");
  }

  const edition = `${date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })} edition`;
  const linkLabel = linkCount === 1 ? "link" : "links";
  const summary = `Plus ${linkCount} .NET focused ${linkLabel} \u2192`;
  const layers = [
    `co_white,l_text:Fira%20Mono_16:${encodeText(edition)}/fl_layer_apply,g_north_west,x_57,y_61`,
    `w_820,c_fit,co_white,l_text:Archivo%20Black_60_line_spacing_-20:${encodeText(normalizedTitle)}/fl_layer_apply,g_north_west,x_54,y_222`,
    `bo_15px_solid_%236360E9,b_%236360E9,co_%23000000,l_text:Archivo%20Black_32:${encodeText(summary)},c_fit,w_600,h_50/fl_layer_apply,g_north_west,x_54,y_403`,
  ];

  return ARCHIVE_OGRAPH_ROOT.replace(
    "/upload/",
    `/upload/${layers.join("/")}/`,
  );
}
