import React from 'react';
import { PageId } from '../types';
import {
  BookOpen,
  Cpu,
  Compass,
  CheckCircle,
  Eye,
  Target,
  ArrowRight,
  Shield,
  Lightbulb,
  HeartHandshake,
  Sparkles,
} from 'lucide-react';

interface AboutPageProps {
  onNavigate: (page: PageId, targetId?: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  const fourPillars = [
    {
      title: 'Education',
      subtitle: 'Understanding how people learn.',
      desc: 'Grounding every technology decision in cognitive psychology, pedagogical science, and real human motivation.',
      icon: BookOpen,
      color: '#1E4E79',
    },
    {
      title: 'Technology',
      subtitle: 'Choosing and using the right digital tools.',
      desc: 'Filtering through digital hype to select modern tools, AI capabilities, and LMS platforms that actually make teaching smoother.',
      icon: Cpu,
      color: '#0F6B78',
    },
    {
      title: 'Learning Design',
      subtitle: 'Creating structured and engaging learning experiences.',
      desc: 'Architecting clear learning pathways, storyboards, bite-sized modules, and authentic assessments that drive real retention.',
      icon: Compass,
      color: '#F15A29',
    },
    {
      title: 'Practical Skills',
      subtitle: 'Helping people apply what they learn in real situations.',
      desc: 'Hands-on practice where participants build actual courses, classroom assets, digital products, and workflows during training.',
      icon: Target,
      color: '#0F6B78',
    },
  ];

  return (
    <div className="space-y-20 sm:space-y-28 pb-20">
      {/* 1. HERO SECTION */}
      <section className="bg-gradient-to-b from-white via-slate-50 to-slate-100/50 pt-16 pb-14 border-b border-slate-200/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#1E4E79] tracking-tight leading-tight">
            Transforming How People Learn, Teach and Create Through Technology
          </h1>
          <p className="text-slate-600 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">
            EdTech Training Hub Ltd is a digital learning and professional development company focused on helping educators, knowledge professionals, coaches, entrepreneurs, organisations and learners thrive in an increasingly digital world.
          </p>
        </div>
      </section>

      {/* 2. OUR STORY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1E4E79] tracking-tight">
              Education is Changing. Technology is Changing. But Access Alone is Not Enough.
            </h2>

            <div className="space-y-4 text-slate-600 text-base leading-relaxed">
              <p>
                The way people learn, teach, work and share knowledge is increasingly
                influenced by technology. But having access to technology is not enough.
                People need the skills, confidence and understanding to use it effectively.
              </p>
              <p className="font-semibold text-slate-800">
                That is where EdTech Training Hub comes in.
              </p>
              <p>
                We bridge the gap between traditional learning and technology by providing practical digital skills training, online teaching support, instructional design, eLearning solutions, LMS integration and personalised learning opportunities.
              </p>
              <p>
                Our work spans different parts of the education and EdTech ecosystem because
                we believe technology can create better opportunities for everyone when it is
                applied intentionally.
              </p>
            </div>
          </div>

          <div className="lg:col-span-5 bg-gradient-to-br from-[#1E4E79] to-[#0F6B78] rounded-3xl p-8 text-white shadow-xl space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-[#F15A29]" />
              </div>
              <h3 className="text-lg font-bold">The Intentionality Gap</h3>
            </div>
            <p className="text-xs text-slate-200 leading-relaxed">
              Too many educators and institutions are given digital devices or subscriptions
              without pedagogical training. Course creators get lost in technical setups, and
              students encounter dry, disengaging digital formats.
            </p>
            <div className="p-4 bg-white/10 rounded-xl border border-white/15 space-y-2">
              <p className="text-xs font-bold text-white">Our Central Mandate:</p>
              <p className="text-xs text-slate-300">
                Make technology practical, human, and pedagogical. Never deploy tools for the sake
                of novelty; deploy them to elevate real learning outcomes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. WHAT WE BELIEVE & THE 4 PILLARS */}
      <section className="bg-slate-100/70 border-y border-slate-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1E4E79] tracking-tight">
              Technology Should Make Good Teaching Better
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              We don&apos;t believe technology should replace good teaching. We believe it
              should support better teaching, deeper learning and more meaningful engagement.
            </p>
          </div>

          {/* 4 Connected Cards Diagram */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {fourPillars.map((p, idx) => {
              const Icon = p.icon;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col space-y-3"
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${p.color}15`, color: p.color }}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">{p.title}</h3>
                  <p className="text-xs font-semibold text-[#0F6B78]">{p.subtitle}</p>
                  <p className="text-xs text-slate-600 leading-relaxed">{p.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. VISION & MISSION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Vision */}
          <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-sm space-y-4 relative overflow-hidden">
            <div className="w-12 h-12 rounded-2xl bg-[#1E4E79]/10 text-[#1E4E79] flex items-center justify-center">
              <Eye className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#1E4E79]">
              Our Vision
            </span>
            <h2 className="text-2xl font-extrabold text-slate-900">
              Impactful, Accessible, Technology-Enabled Education
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              &ldquo;To transform learning and professional development by making technology-enabled education accessible, practical and impactful for everyone.&rdquo;
            </p>
            <p className="text-slate-500 text-xs leading-relaxed">
              We envision a world where educators, professionals, organisations and learners have the digital skills, tools and confidence they need to learn, teach and create meaningful opportunities in the digital age.
            </p>
          </div>

          {/* Mission */}
          <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-sm space-y-4 relative overflow-hidden">
            <div className="w-12 h-12 rounded-2xl bg-[#F15A29]/10 text-[#F15A29] flex items-center justify-center">
              <Target className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#F15A29]">
              Our Mission
            </span>
            <h2 className="text-2xl font-extrabold text-slate-900">
              Empowering People & Organisations to Succeed
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              &ldquo;To empower educators, knowledge professionals, organisations and learners with the digital skills, technology and learning solutions they need to succeed.&rdquo;
            </p>
            <p className="text-slate-500 text-xs leading-relaxed">
              We achieve through Practical digital skills training, Online teaching and tutoring development, Instructional design and eLearning solutions, LMS integration and support, AI and EdTech training, Digital product and course development support, Professional development opportunities and Personalised learning experiences for students.
            </p>
          </div>
        </div>
      </section>

      {/* 5. OUR APPROACH & GOAL */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 lg:p-16 space-y-8">
          <div className="max-w-3xl space-y-4">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Practical. Purposeful. Learner-Focused.
            </h2>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              We don&apos;t simply introduce people to technology. We help them understand how
              to apply it effectively.
            </p>
            <p className="text-slate-400 text-sm leading-relaxed">
              Our programmes and solutions are designed to be practical, accessible and
              relevant to real-world learning and professional needs.
            </p>
          </div>

          <div className="pt-4 border-t border-slate-800 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-[#F15A29]">
                <CheckCircle className="w-4 h-4" />
                <h3 className="text-sm font-bold text-white">Practical</h3>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Clear, actionable methodologies designed for immediate application in real
                classrooms, courses, and businesses.
              </p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-[#0F6B78]">
                <CheckCircle className="w-4 h-4" />
                <h3 className="text-sm font-bold text-white">Purposeful</h3>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Tools are chosen with intention, eliminating tech overwhelm and focusing only on
                what genuinely enhances learning.
              </p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-emerald-400">
                <CheckCircle className="w-4 h-4" />
                <h3 className="text-sm font-bold text-white">Learner-Focused</h3>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Designed around human retention, individual pacing, accessibility, and
                measurable skill acquisition.
              </p>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Our Goal</p>
              <p className="text-base font-bold text-white">
                To help more people learn better, teach better, create better and thrive in the digital age.
              </p>
            </div>
            <button
              onClick={() => onNavigate('solutions')}
              className="px-6 py-3 rounded-xl bg-[#F15A29] hover:bg-[#d9491d] text-white font-bold text-xs shrink-0 transition-colors"
            >
              Explore What We Do &rarr;
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
