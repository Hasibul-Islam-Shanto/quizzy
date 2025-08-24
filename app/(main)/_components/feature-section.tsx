'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { BarChart3, BookOpen, Edit3, Share2 } from 'lucide-react';
import { motion } from 'motion/react';

const features = [
  {
    title: 'Easy Quiz Creation',
    description:
      'Build comprehensive quizzes with intuitive drag-and-drop interface and customizable question types.',
    icon: BookOpen,
  },
  {
    title: 'Edit & Customize',
    description:
      'Fine-tune questions, adjust difficulty levels, and personalize quizzes to match your teaching style.',
    icon: Edit3,
  },
  {
    title: 'Easy Sharing',
    description:
      'Share quizzes instantly with students via links, QR codes, or integrate with your LMS.',
    icon: Share2,
  },
  {
    title: 'Performance Tracking',
    description:
      'Monitor student progress with detailed analytics and interactive leaderboards.',
    icon: BarChart3,
  },
];
const FeatureSection = () => {
  return (
    <section id="features" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="text-foreground mb-4 text-3xl font-bold sm:text-4xl">
            Everything You Need to Create Amazing Quizzes
          </h2>
          <p className="text-muted-foreground mx-auto max-w-2xl text-xl">
            Powerful features designed to make quiz creation and management
            effortless for educators.
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
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              <Card className="group h-full border text-center transition-all duration-300 hover:border-purple-200 hover:shadow-xl dark:hover:border-purple-800">
                <CardHeader>
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-600 shadow-lg transition-all duration-300 group-hover:bg-purple-700">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-xl text-purple-600 transition-all duration-300 group-hover:text-purple-700 dark:text-purple-400 dark:group-hover:text-purple-300">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeatureSection;
