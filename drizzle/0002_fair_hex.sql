ALTER TABLE "applicants" ADD COLUMN "user_id" uuid;--> statement-breakpoint
ALTER TABLE "applicants" ADD COLUMN "first_name" text NOT NULL;--> statement-breakpoint
ALTER TABLE "applicants" ADD COLUMN "last_name" text;--> statement-breakpoint
ALTER TABLE "applicants" ADD CONSTRAINT "applicants_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "applicants" DROP COLUMN "full_name";

