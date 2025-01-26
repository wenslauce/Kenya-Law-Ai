import { FC } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Search, Mic } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";

const Index: FC = () => {
  return (
    <Layout>
      <section className="relative min-h-[90vh] flex items-center justify-center bg-gradient-to-b from-primary/5 to-transparent">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto animate-fade-up">
            <h1 className="text-4xl md:text-6xl font-bold text-accent mb-6">
              Explore Kenya's Constitution
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              Your AI-powered guide to understanding Kenya's legal framework and political landscape
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild size="lg" className="w-full sm:w-auto">
                <Link to="/ask">
                  Start Exploring <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
                <Link to="/constitution">View Constitution</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <BookOpen className="w-8 h-8" />,
                title: "Constitution Explorer",
                description: "Access and search through Kenya's Constitution with ease",
              },
              {
                icon: <Mic className="w-8 h-8" />,
                title: "AI Assistant",
                description: "Get instant answers to your constitutional questions",
              },
              {
                icon: <Search className="w-8 h-8" />,
                title: "Smart Search",
                description: "Find specific articles and interpretations quickly",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-card p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow animate-fade-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="text-primary mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;