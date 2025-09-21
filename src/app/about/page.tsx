import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

export default function AboutUsPage() {
  return (
    <div className="container py-12 md:py-16">
      <Card className="max-w-4xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl md:text-4xl">About MaidLink</CardTitle>
        </CardHeader>
        <CardContent className="space-y-8 text-muted-foreground">
          <section className="text-center">
            <h2 className="text-xl font-semibold text-foreground mb-2">
              Our Mission
            </h2>
            <p className="text-lg">
              “MaidLink makes daily help reliable, verified, and transparent.”
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-4 text-center">
              Core Features
            </h2>
            <ul className="space-y-3 max-w-md mx-auto">
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-primary mt-1 mr-3 shrink-0" />
                <span>
                  <strong>Verified Profiles:</strong> We ensure that every maid on our
                  platform is background-checked and verified.
                </span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-primary mt-1 mr-3 shrink-0" />
                <span>
                  <strong>Attendance-Based Reliability:</strong> Our unique reliability
                  score is based on actual attendance and client reviews.
                </span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-primary mt-1 mr-3 shrink-0" />
                <span>
                  <strong>Transparent Reviews:</strong> Honest feedback from other clients
                  helps you make informed decisions.
                </span>
              </li>
               <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-primary mt-1 mr-3 shrink-0" />
                <span>
                  <strong>Local Trust:</strong> We focus on connecting you with trusted
                  help from your own community.
                </span>
              </li>
            </ul>
          </section>

          <section className="text-center">
            <h2 className="text-xl font-semibold text-foreground mb-2">
              Our Vision
            </h2>
            <p className="text-lg max-w-2xl mx-auto">
              To formalize India’s domestic help economy with technology,
              ensuring fair pay, building digital work records, and fostering
              trust between households and helpers.
            </p>
          </section>
        </CardContent>
      </Card>
    </div>
  );
}
