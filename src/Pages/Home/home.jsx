import React, { useEffect, useState } from "react";
import NavBar from "../../components/navbar";
import headerImg from "../../assets/images/header.png";
import { Button } from "../../components/ui/button";
import aboutImg from "../../assets/images/about.svg";
import { scrollToSection } from "../../assets/home";
import { Link } from "react-router-dom";
import WordPullUp from "../../components/ui/word-pull-up";
import {
  BarChartIcon,
  BoltIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  CogIcon,
  SettingsIcon,
} from "lucide-react";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";
const scrollToAbout = () => scrollToSection("about");

const Card = ({ title, text, icon }) => {
  return (
    <div className="flex flex-col items-start rounded-lg bg-darkblue p-6 shadow-sm transition-all hover:shadow-md dark:bg-gray-950 dark:hover:shadow-lg">
      {icon}
      <h3 className="mb-2 text-xl font-semibold text-white">{title}</h3>
      <p className="text-white ">{text}</p>
    </div>
  );
};

export default function Home() {
  const [isWord1Visible, setWord1Visible] = useState(false);
  const [isWord2Visible, setWord2Visible] = useState(false);
  const [isWord3Visible, setWord3Visible] = useState(false);

  useEffect(() => {
    const delays = [0, 1100, 1800]; // Délais en millisecondes

    const timeouts = [
      setTimeout(() => setWord1Visible(true), delays[0]),
      setTimeout(() => setWord2Visible(true), delays[1]),
      setTimeout(() => setWord3Visible(true), delays[2]),
    ];

    // Nettoyer les timeouts
    return () => timeouts.forEach((timeout) => clearTimeout(timeout));
  }, []);

  return (
    <div className="w-full bg-gradient-to-b from-white via-[#e6f2ff] to-white py-12 md:py-20 lg:py-28">
      <header>
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-center px-4 md:px-6 gap-8 md:gap-12">
          <div className="space-y-4 md:text-left flex flex-col max-w-screen-lg">
            <h1 className="flex flex-col items-start text-left text-xl font-bold text-[#272643] sm:text-2xl md:text-3xl lg:text-4xl font-serif capitalize">
              {isWord1Visible && (
                <WordPullUp words="Streamline Health Insurance for Everyone." />
              )}
              {isWord2Visible && <WordPullUp words="One Platform." />}
              {isWord3Visible && <WordPullUp words="Endless Benefits." />}
            </h1>
            <p className="max-w-[600px] text-lg text-[#272643] md:text-xl font-serif">
              Simplify health insurance benefits management for insurers,
              companies, doctors, patients, and pharmacies with our innovative
              SaaS solution.
            </p>
            <div className="flex justify-center md:justify-start gap-4">
              <Button
                className="transition-colors duration-300 hover:bg-[#1e2a78] hover:text-white bg-whitesmoke font-serif"
                variant="secondary"
              >
                <Link to="signup">Sign Up</Link>
              </Button>
              <Button
                variant="primary"
                className="bg-[#000000] text-white font-serif"
                onClick={scrollToAbout}
              >
                Get Started
              </Button>
            </div>
          </div>
          <div className="flex-1">
            <img
              alt="Header Image"
              className="w-full max-w-[400px] mx-auto md:max-w-none rounded-lg"
              height={400}
              src={headerImg}
              style={{ aspectRatio: "600/400", objectFit: "cover" }}
              width={600}
            />
          </div>
        </div>
      </header>
      <section id="about" className="w-full mt-[200px] ">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-center px-4 md:px-6 gap-8 md:gap-12">
          <div className="flex-1">
            <img
              alt="About Us Image"
              className="w-full max-w-[400px] mx-auto md:max-w-none rounded-lg"
              height={400}
              src={aboutImg}
              style={{ aspectRatio: "600/400", objectFit: "cover" }}
              width={600}
            />
          </div>
          <div className="space-y-4 text-center md:text-left">
            <h2 className="text-3xl font-bold text-[#272643] sm:text-4xl md:text-5xl lg:text-6xl font-serif capitalize">
              About AssurConnect
            </h2>
            <p className="max-w-[600px] text-lg text-[#272643] md:text-xl font-serif">
              At AssurConnect we're revolutionizing the healthcare experience by
              connecting insurers, businesses, doctors, patients, and pharmacies
              seamlessly. Our platform serves as the nexus where healthcare
              plans meet streamlined processes, ensuring efficiency,
              accessibility, and satisfaction for all involved.
            </p>

            <div className="flex justify-center md:justify-start gap-4">
              <Button variant="primary">Learn More</Button>
              <Button variant="secondary">Contact Us</Button>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 ">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Our Services
              </h2>
              <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                We offer a wide range of services to help your business succeed.
              </p>
            </div>
          </div>
          <div className="mx-auto grid grid-cols-1 gap-6 py-12 sm:grid-cols-2 md:grid-cols-3 lg:gap-8 ">
            <Card
              icon={
                <BoltIcon className="mb-4 h-8 w-8 text-white dark:text-gray-50" />
              }
              title="Plan Depository"
              text="Insurers can easily deposit and manage their healthcare plans, complete with detailed descriptions, on our secure platform. Upload plan information and update offerings to ensure businesses have access to the latest healthcare options."
            />
            <Card
              icon={<CogIcon className="mb-4 h-8 w-8 text-white" />}
              title="Plan Purchase"
              text="Businesses can conveniently browse and purchase healthcare plans tailored to their needs directly through our site, streamlining the process. Our platform allows businesses to quickly and efficiently acquire the plans that best suit their employees."
            />
            <Card
              icon={<BarChartIcon className="mb-4 h-8 w-8 text-white" />}
              title="Employee Management"
              text="Businesses can effortlessly add and manage employees within the purchased healthcare plans. This service allows businesses to handle enrollment and coverage changes seamlessly, ensuring that all employees are properly covered and can access healthcare services when needed."
            />
            <Card
              icon={<SettingsIcon className="mb-4 h-8 w-8 text-white" />}
              title="Patient Experience"
              text="After being enrolled by their employer, patients can manage their healthcare journey through our intuitive mobile app. The app allows patients to schedule appointments with doctors, procure medications at pharmacies, and enjoy a seamless healthcare experience."
            />
            <Card
              icon={<SettingsIcon className="mb-4 h-8 w-8 text-white" />}
              title="Prescription Handling"
              text="Our unique prescription coding system ensures efficient and secure transmission of prescriptions from doctors to pharmacies, enhancing convenience for patients."
            />
            <Card
              icon={<SettingsIcon className="mb-4 h-8 w-8 text-white" />}
              title="Claim Submission"
              text="Patients can easily submit medication claims directly from the mobile app, simplifying the reimbursement process."
            />
            {/* <div className="flex flex-col items-start rounded-lg bg-white p-6 shadow-sm transition-all hover:shadow-md dark:bg-gray-950 dark:hover:shadow-lg">
            <SettingsIcon className="mb-4 h-8 w-8 text-gray-900 dark:text-gray-50" />
            <h3 className="mb-2 text-xl font-semibold">Insurer Dashboard</h3>
            <p className="text-gray-500 dark:text-gray-400">
              Insurers gain valuable insights into claims data, enabling informed decisions.
            </p>
          </div> */}
          </div>
        </div>
      </section>

      <section className="w-full py-12 ">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-4xl space-y-8">
            <div className="space-y-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Frequently Asked Questions
              </h2>
              <p className="text-muted-foreground md:text-xl">
                Get answers to the most common questions about our healthcare
                platform.
              </p>
            </div>
            <div className="space-y-6">
              <Collapsible>
                <CollapsibleTrigger className="flex w-full items-center justify-between rounded-lg bg-muted px-6 py-4 text-lg font-medium transition-colors hover:bg-muted/50 [&[data-state=open]>svg]:rotate-90">
                  What are the key benefits for insurers?
                  <ChevronRightIcon className="h-5 w-5 transition-all" />
                </CollapsibleTrigger>
                <CollapsibleContent className="px-6 pt-4 pb-6 text-muted-foreground">
                  <p>
                    Our healthcare platform offers insurers a range of benefits
                    to streamline operations, improve patient outcomes, and
                    enhance profitability. Key advantages include:
                  </p>
                  <ul className="mt-4 space-y-2 text-sm">
                    <li>
                      <span className="font-medium">
                        Reduced administrative costs:
                      </span>{" "}
                      Automated workflows and integrated data management reduce
                      the time and resources required for claims processing,
                      eligibility verification, and provider network management.
                    </li>
                    <li>
                      <span className="font-medium">
                        Improved patient engagement:
                      </span>{" "}
                      Our platform enables seamless communication and
                      collaboration between insurers, providers, and patients,
                      leading to better care coordination and higher patient
                      satisfaction.
                    </li>
                    <li>
                      <span className="font-medium">
                        Enhanced data analytics:
                      </span>{" "}
                      Robust data analytics capabilities provide insurers with
                      valuable insights to identify trends, optimize care
                      pathways, and make informed decisions.
                    </li>
                    <li>
                      <span className="font-medium">Compliance assurance:</span>{" "}
                      Our platform is designed to comply with all relevant
                      healthcare regulations and industry standards, ensuring
                      seamless integration and peace of mind for insurers.
                    </li>
                  </ul>
                </CollapsibleContent>
              </Collapsible>
              <Collapsible>
                <CollapsibleTrigger className="flex w-full items-center justify-between rounded-lg bg-muted px-6 py-4 text-lg font-medium transition-colors hover:bg-muted/50 [&[data-state=open]>svg]:rotate-90">
                  What sets your platform apart?
                  <ChevronRightIcon className="h-5 w-5 transition-all" />
                </CollapsibleTrigger>
                <CollapsibleContent className="px-6 pt-4 pb-6 text-muted-foreground">
                  <p>
                    Our healthcare platform is designed to be a game-changer in
                    the industry, offering a unique combination of features and
                    capabilities that set us apart:
                  </p>
                  <ul className="mt-4 space-y-2 text-sm">
                    <li>
                      <span className="font-medium">Interoperability:</span> Our
                      platform seamlessly integrates with a wide range of
                      existing healthcare systems, enabling a truly connected
                      ecosystem for insurers, providers, and patients.
                    </li>
                    <li>
                      <span className="font-medium">
                        Personalized experience:
                      </span>{" "}
                      Leveraging advanced analytics and machine learning, our
                      platform delivers personalized recommendations and
                      tailored solutions for each insurer, provider, and
                      patient.
                    </li>
                    <li>
                      <span className="font-medium">
                        Scalable infrastructure:
                      </span>{" "}
                      Our platform is built on a highly scalable and secure
                      infrastructure, ensuring seamless performance and
                      reliability even as your organization grows.
                    </li>
                    <li>
                      <span className="font-medium">
                        Continuous innovation:
                      </span>{" "}
                      We are committed to staying at the forefront of healthcare
                      technology, regularly introducing new features and
                      enhancements to address evolving industry needs.
                    </li>
                  </ul>
                </CollapsibleContent>
              </Collapsible>
              <Collapsible>
                <CollapsibleTrigger className="flex w-full items-center justify-between rounded-lg bg-muted px-6 py-4 text-lg font-medium transition-colors hover:bg-muted/50 [&[data-state=open]>svg]:rotate-90">
                  How does the platform ensure compliance?
                  <ChevronRightIcon className="h-5 w-5 transition-all" />
                </CollapsibleTrigger>
                <CollapsibleContent className="px-6 pt-4 pb-6 text-muted-foreground">
                  <p>
                    Compliance with healthcare regulations and industry
                    standards is a top priority for our platform. We have
                    implemented robust measures to ensure seamless integration
                    and peace of mind for our clients:
                  </p>
                  <ul className="mt-4 space-y-2 text-sm">
                    <li>
                      <span className="font-medium">HIPAA compliance:</span> Our
                      platform is designed to meet all the requirements of the
                      Health Insurance Portability and Accountability Act
                      (HIPAA), ensuring the secure handling and protection of
                      sensitive patient data.
                    </li>
                    <li>
                      <span className="font-medium">Data encryption:</span> All
                      data transmitted and stored within our platform is
                      encrypted using industry-standard protocols, safeguarding
                      information from unauthorized access.
                    </li>
                    <li>
                      <span className="font-medium">
                        Auditing and reporting:
                      </span>{" "}
                      Our platform provides comprehensive auditing and reporting
                      capabilities to help insurers demonstrate compliance with
                      regulatory requirements.
                    </li>
                    <li>
                      <span className="font-medium">
                        Continuous monitoring:
                      </span>{" "}
                      We constantly monitor our systems and infrastructure to
                      identify and address any potential security
                      vulnerabilities or compliance issues.
                    </li>
                  </ul>
                </CollapsibleContent>
              </Collapsible>
              <Collapsible>
                <CollapsibleTrigger className="flex w-full items-center justify-between rounded-lg bg-muted px-6 py-4 text-lg font-medium transition-colors hover:bg-muted/50 [&[data-state=open]>svg]:rotate-90">
                  How do I get started with the platform?
                  <ChevronRightIcon className="h-5 w-5 transition-all" />
                </CollapsibleTrigger>
                <CollapsibleContent className="px-6 pt-4 pb-6 text-muted-foreground">
                  <p>
                    Getting started with our healthcare platform is a
                    straightforward process. Here's what you can expect:
                  </p>
                  <ul className="mt-4 space-y-2 text-sm">
                    <li>
                      <span className="font-medium">
                        Schedule a consultation:
                      </span>{" "}
                      Our team will work with you to understand your specific
                      needs and requirements, and provide a personalized
                      assessment of how our platform can benefit your
                      organization.
                    </li>
                    <li>
                      <span className="font-medium">Seamless onboarding:</span>{" "}
                      Our dedicated onboarding team will guide you through the
                      entire implementation process, ensuring a smooth and
                      efficient transition to our platform.
                    </li>
                    <li>
                      <span className="font-medium">
                        Comprehensive training:
                      </span>{" "}
                      We offer comprehensive training programs to ensure your
                      team is fully equipped to leverage the platform's features
                      and functionalities.
                    </li>
                    <li>
                      <span className="font-medium">Ongoing support:</span> Our
                      customer success team is available to provide ongoing
                      support and assistance, helping you maximize the value of
                      our platform.
                    </li>
                  </ul>
                </CollapsibleContent>
              </Collapsible>
              <Collapsible>
                <CollapsibleTrigger className="flex w-full items-center justify-between rounded-lg bg-muted px-6 py-4 text-lg font-medium transition-colors hover:bg-muted/50 [&[data-state=open]>svg]:rotate-90">
                  What support options are available?
                  <ChevronRightIcon className="h-5 w-5 transition-all" />
                </CollapsibleTrigger>
                <CollapsibleContent className="px-6 pt-4 pb-6 text-muted-foreground">
                  <p>
                    At AssurConnect, we are committed to providing comprehensive
                    support to ensure your success. Here are the various support
                    options available:
                  </p>
                  <ul className="mt-4 space-y-2 text-sm">
                    <li>
                      <span className="font-medium">Technical support:</span>{" "}
                      Our dedicated technical support team is available 24/7 to
                      assist you with any technical issues or questions you may
                      have.
                    </li>
                    <li>
                      <span className="font-medium">
                        Educational resources:
                      </span>{" "}
                      We offer a wide range of educational resources, including
                      user guides, tutorials, and webinars, to help you and your
                      team maximize the platform's capabilities.
                    </li>
                    <li>
                      <span className="font-medium">
                        Dedicated account management:
                      </span>{" "}
                      Each of our clients is assigned a dedicated account
                      manager who serves as a single point of contact for all
                      your needs.
                    </li>
                    <li>
                      <span className="font-medium">Community support:</span>{" "}
                      Our online community forum provides a platform for you to
                      connect with other users, share best practices, and
                      collaborate on solutions.
                    </li>
                  </ul>
                </CollapsibleContent>
              </Collapsible>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
