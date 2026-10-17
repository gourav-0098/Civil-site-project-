'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Search,
  Building,
  ShieldCheck,
  ChevronRight,
  HardHat,
  Truck,
  Compass,
  Layers,
  Droplets,
  Zap,
  CheckCircle2,
  Calendar
} from 'lucide-react';
import { Spotlight } from '../ui/Spotlight';
import { BackgroundGrid } from '../ui/BackgroundGrid';
import { FadeIn, StaggerContainer, StaggerItem, CounterTicker, TextReveal } from '../ui/MotionWrapper';
import { Button } from '../ui/Button';
import { BentoGrid, BentoCard } from '../ui/BentoGrid';
import { Accordion } from '../ui/Accordion';
import { GlowCard } from '../ui/GlowCard';
import ProjectCard from '../ProjectCard';

export function HomeHero() {
  return (
    <section className="relative min-h-[90vh] flex items-center bg-navy-950 text-white overflow-hidden">
      {/* 1. Aceternity Spotlight Lighting */}
      <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="#EA580C" />

      {/* 2. Engineering Blueprint Background Grid */}
      <BackgroundGrid className="absolute inset-0 z-0 h-full">
        {/* Architectural Civil Photography Backdrop */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1541888946425-d0fbb1861593?auto=format&fit=crop&w=2000&q=85"
            alt="Major civil engineering infrastructure viaduct and bridge construction"
            fill
            priority
            className="object-cover object-center opacity-25 mix-blend-luminosity filter contrast-125"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/85 to-navy-950/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-transparent" />
        </div>
      </BackgroundGrid>

      {/* 3. Hero Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 w-full">
        <div className="max-w-3xl space-y-8">
          {/* Status Badge */}
          <FadeIn delay={0.1}>
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 bg-navy-900/90 border border-navy-700/80 text-xs font-mono text-steel-300 tracking-wider uppercase backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-industrial-orange animate-ping" />
              <span>Civil Infrastructure & Heavy Engineering</span>
            </div>
          </FadeIn>

          {/* Main Headline */}
          <div className="space-y-2">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white font-display leading-[1.1]">
              <TextReveal text="Engineering Infrastructure." delay={0.2} />
              <br />
              <span className="text-industrial-orange inline-block">
                <TextReveal text="Building Tomorrow." delay={0.4} />
              </span>
            </h1>
          </div>

          {/* Subtitle */}
          <FadeIn delay={0.5}>
            <p className="text-lg sm:text-xl text-steel-300 leading-relaxed font-light max-w-2xl font-sans">
              Nivara Infrastructure delivers considered engineering and construction solutions for the infrastructure that moves communities and industries forward.
            </p>
          </FadeIn>

          {/* Action Buttons */}
          <FadeIn delay={0.6}>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <Button href="/projects" variant="orange" size="lg" icon={<ArrowRight className="w-4 h-4" />}>
                Explore Our Projects
              </Button>
              <Button href="/contact" variant="navy" size="lg">
                Discuss a Project
              </Button>
            </div>
          </FadeIn>

          {/* Quick Project Search Bar */}
          <FadeIn delay={0.7}>
            <form
              action="/projects"
              method="GET"
              className="p-2 bg-navy-900/80 backdrop-blur-md border border-steel-700/50 rounded-none flex flex-col sm:flex-row gap-2 max-w-xl shadow-2xl"
            >
              <div className="flex-1 flex items-center px-3 py-2 bg-navy-950/90 text-white border border-steel-800">
                <Search className="w-4 h-4 text-steel-400 shrink-0 mr-2" />
                <input
                  type="text"
                  name="search"
                  placeholder="Search projects by title, region, or category..."
                  className="w-full text-xs sm:text-sm placeholder-steel-400 focus:outline-none bg-transparent font-sans"
                />
              </div>
              <button
                type="submit"
                className="px-6 py-2.5 bg-industrial-orange hover:bg-industrial-orangeHover text-white text-xs font-bold font-mono uppercase tracking-wider transition-colors shrink-0 flex items-center justify-center gap-1.5"
              >
                <span>Search Portfolio</span>
              </button>
            </form>
          </FadeIn>
        </div>
      </div>

      {/* 4. Live Metric Ticker Bar */}
      <div className="absolute bottom-0 inset-x-0 bg-navy-900/90 border-t border-navy-800/80 py-4 hidden md:block backdrop-blur-sm z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-4 gap-6 text-xs font-mono">
          <div className="flex items-center gap-3">
            <span className="text-xl font-bold font-display text-industrial-orange">
              <CounterTicker value={100} suffix="%" />
            </span>
            <span className="text-steel-400 uppercase tracking-wider text-[11px] leading-tight">
              Quality & Safety Standards
            </span>
          </div>
          <div className="flex items-center gap-3 border-l border-navy-800 pl-6">
            <span className="text-xl font-bold font-display text-white">
              <CounterTicker value={6} suffix=" Major" />
            </span>
            <span className="text-steel-400 uppercase tracking-wider text-[11px] leading-tight">
              Infrastructure Sectors
            </span>
          </div>
          <div className="flex items-center gap-3 border-l border-navy-800 pl-6">
            <span className="text-xl font-bold font-display text-emerald-400">
              <CounterTicker value={0} suffix=" LTI" />
            </span>
            <span className="text-steel-400 uppercase tracking-wider text-[11px] leading-tight">
              Lost Time Injury Commitment
            </span>
          </div>
          <div className="flex items-center gap-3 border-l border-navy-800 pl-6">
            <span className="text-xl font-bold font-display text-white">
              <CounterTicker value={24} suffix="/7" />
            </span>
            <span className="text-steel-400 uppercase tracking-wider text-[11px] leading-tight">
              Rigorous Site Oversight
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export function CapabilitiesSection() {
  const capabilities = [
    {
      title: 'Highways and Bridges',
      description:
        'Multi-lane arterial expressways, long-span viaducts, flyovers, and strategic river crossing structures built for sustained heavy traffic.',
      icon: <Truck className="w-6 h-6" />,
      badge: 'Transport Corridors',
      href: '/projects?category=Highways+and+Bridges',
      className: 'lg:col-span-2'
    },
    {
      title: 'Transit & Rail Infrastructure',
      description:
        'Elevated rail guideways, multi-modal transfer hubs, and high-capacity regional mass transit corridors.',
      icon: <Layers className="w-6 h-6" />,
      badge: 'Rapid Mobility',
      href: '/projects?category=Transit+and+Rail'
    },
    {
      title: 'Industrial & Energy Works',
      description:
        'Heavy industrial logistics foundations, renewable energy park sub-stations, and high-voltage transmission civil works.',
      icon: <Zap className="w-6 h-6" />,
      badge: 'Power & Heavy Industry',
      href: '/projects?category=Industrial+and+Energy+Infrastructure'
    },
    {
      title: 'Water & Utility Networks',
      description:
        'Raw water bulk conveyance mains, regional treatment facilities, intake pumping installations, and distribution canals.',
      icon: <Droplets className="w-6 h-6" />,
      badge: 'Public Utilities',
      href: '/projects?category=Water+and+Utilities',
      className: 'lg:col-span-2'
    }
  ];

  return (
    <section className="py-24 lg:py-32 bg-steel-100 border-b border-steel-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="space-y-3 max-w-2xl">
              <span className="text-xs font-mono font-semibold text-industrial-orange uppercase tracking-widest">
                Core Capabilities
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy-900 font-display">
                Engineering Capabilities Across Sectors
              </h2>
              <p className="text-steel-600 text-sm md:text-base leading-relaxed font-sans">
                Nivara Infrastructure brings precision engineering, structured project governance, and specialized equipment to mission-critical civil works.
              </p>
            </div>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-xs font-bold font-mono text-navy-900 hover:text-industrial-orange uppercase tracking-wider transition-colors shrink-0"
            >
              <span>Explore All Capabilities</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </FadeIn>

        {/* Bento Grid */}
        <BentoGrid>
          {capabilities.map((item, idx) => (
            <BentoCard
              key={idx}
              title={item.title}
              description={item.description}
              icon={item.icon}
              badge={item.badge}
              href={item.href}
              className={item.className || ''}
            />
          ))}
        </BentoGrid>
      </div>
    </section>
  );
}

export function DeliveryApproachSection() {
  const steps = [
    {
      number: '01',
      title: 'Strategic Planning & Geotechnical Feasibility',
      content:
        'Thorough site survey, geological reconnaissance, subsurface investigation, regulatory alignment, and constructability modeling prior to ground engagement.'
    },
    {
      number: '02',
      title: 'Detailed Structural & Hydraulic Engineering',
      content:
        'Value engineering and finite element structural design ensuring strict structural compliance with IRC, IS, and international civil construction codes.'
    },
    {
      number: '03',
      title: 'Disciplined Site Execution & Program Governance',
      content:
        'Deployment of specialized heavy plant machinery, automated quality monitoring, zero-harm EHS protocols, and real-time critical path project tracking.'
    },
    {
      number: '04',
      title: 'Verification, Testing & Structured Handover',
      content:
        'Rigorous load deflection tests, material certification audits, documentation archives, and seamless handover to operating concessionaires.'
    }
  ];

  return (
    <section className="py-24 lg:py-32 bg-white border-b border-steel-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs font-mono font-semibold text-industrial-orange uppercase tracking-widest">
              Execution Methodology
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-900 font-display leading-tight">
              A Disciplined Approach to Project Delivery
            </h2>
            <p className="text-steel-600 text-sm md:text-base leading-relaxed font-sans">
              Infrastructure succeeds on certainty. Our 4-stage delivery process coordinates technical expertise, safety culture, and contractual precision from day zero through handover.
            </p>
            <div className="pt-4">
              <Button href="/about" variant="outline" size="md">
                Learn About Our Standards
              </Button>
            </div>
          </div>

          <div className="lg:col-span-7">
            <Accordion items={steps} />
          </div>
        </div>
      </div>
    </section>
  );
}

export function ClosingCtaSection() {
  return (
    <section className="relative py-24 lg:py-32 bg-navy-950 text-white overflow-hidden">
      <Spotlight className="top-0 right-0 md:top-10" fill="#EA580C" />
      <BackgroundGrid className="absolute inset-0 z-0 h-full">
        <div className="absolute inset-0 bg-navy-950/80" />
      </BackgroundGrid>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        <FadeIn>
          <span className="text-xs font-mono font-semibold text-industrial-orange uppercase tracking-widest">
            Partner With Nivara
          </span>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white font-display mt-3 leading-tight">
            Ready to Build Tomorrow’s Infrastructure?
          </h2>
          <p className="text-steel-300 text-base sm:text-lg max-w-2xl mx-auto mt-4 font-light leading-relaxed font-sans">
            Whether preparing for a public tender, institutional development, or regional infrastructure partnership, our team is ready to discuss your project requirements.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
            <Button href="/contact" variant="orange" size="lg" icon={<ArrowRight className="w-4 h-4" />}>
              Submit Project Inquiry
            </Button>
            <Button href="/projects" variant="navy" size="lg">
              Explore Our Portfolio
            </Button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
