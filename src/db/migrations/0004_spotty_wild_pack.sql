CREATE TABLE "ai_feedbacks" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"profile_id" uuid NOT NULL,
	"summary_id" uuid,
	"user_prompt" text NOT NULL,
	"ada_response" text NOT NULL,
	"feedback_type" text NOT NULL,
	"feedback_note" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "ai_feedbacks" ADD CONSTRAINT "ai_feedbacks_profile_id_profiles_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."profiles"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ai_feedbacks" ADD CONSTRAINT "ai_feedbacks_summary_id_summaries_id_fk" FOREIGN KEY ("summary_id") REFERENCES "public"."summaries"("id") ON DELETE no action ON UPDATE no action;