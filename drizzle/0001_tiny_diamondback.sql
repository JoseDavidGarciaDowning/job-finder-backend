CREATE TABLE "applicants" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"id_experiencia_laboral" integer,
	"id_educacion" integer,
	"full_name" text NOT NULL,
	"ubication" json,
	"profile_picture_url" text,
	"bio" text
);
