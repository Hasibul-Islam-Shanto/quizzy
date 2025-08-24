'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { motion } from 'motion/react';

const steps = [
  {
    step: '1',
    title: 'Enter Topic or Upload File',
    description:
      'Simply type your topic or upload your study materials. Our AI understands various formats including text, PDFs, and documents.',
    image: '/upload-type.png',
  },
  {
    step: '2',
    title: 'AI Generates Questions',
    description:
      'Our advanced AI analyzes your content and creates relevant, engaging questions with multiple choice options and explanations.',
    image: '/generated-quiz.jpg',
  },
  {
    step: '3',
    title: 'Share & Take Quizzes',
    description:
      'Share your quiz with students instantly. They can take quizzes on any device and see results with detailed explanations.',
    image: '/participate-quiz.jpg',
  },
];

const HowItWorkSection = () => {
  return (
    <section id="how-it-works" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="text-foreground mb-4 text-3xl font-bold sm:text-4xl">
            How It Works
          </h2>
          <p className="text-muted-foreground mx-auto max-w-2xl text-xl">
            Create professional quizzes in three simple steps. No technical
            expertise required.
          </p>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            visible: {
              transition: { staggerChildren: 0.18 },
            },
            hidden: {},
          }}
          className="grid grid-cols-1 gap-8 lg:grid-cols-3"
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="relative"
            >
              <Card className="h-full transition-shadow duration-300 hover:shadow-lg">
                <CardHeader className="text-center">
                  <div className="bg-primary text-primary-foreground mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full text-xl font-bold">
                    {step.step}
                  </div>
                  <CardTitle className="text-xl">{step.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <img
                    src={step.image || '/placeholder.svg'}
                    alt={step.title}
                    className="mb-4 h-48 w-full rounded-lg object-cover"
                  />
                  <CardDescription className="text-base leading-relaxed">
                    {step.description}
                  </CardDescription>
                </CardContent>
              </Card>

              {index < steps.length - 1 && (
                <div className="absolute top-1/2 -right-4 hidden -translate-y-1/2 transform lg:block">
                  <div className="bg-border h-0.5 w-8"></div>
                  <div className="border-l-border absolute top-1/2 right-0 h-0 w-0 -translate-y-1/2 transform border-t-2 border-b-2 border-l-4 border-t-transparent border-b-transparent"></div>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorkSection;
