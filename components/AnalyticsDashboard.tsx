'use client';

import React from 'react';
import { Student, InteractionLog, InstructorSummary } from '@/lib/types';
import { 
  Download, 
  BarChart2, 
  ChevronRight
} from 'lucide-react';

interface AnalyticsDashboardProps {
  students: Student[];
  interactions: InteractionLog[];
  instructorSummaries: InstructorSummary[];
  onExportCSV: () => void;
  onSelectInstructor: (name: string) => void;
}

export function AnalyticsDashboard({
  students,
  interactions,
  instructorSummaries,
  onExportCSV,
  onSelectInstructor
}: AnalyticsDashboardProps) {
  const totalStudents = students.length;
  const level0Students = students.filter((s) => s.level === 'Level 0');
  const level0Total = level0Students.length;
  const level0Cleared = level0Students.filter((s) => s.status.includes('Cleared')).length;
  const level0Revisit = level0Students.filter((s) => s.status.includes('Revisit')).length;

  const levelDistribution = ['Level 0', 'Level 1', 'Level 2', 'Level 3', 'Level 4'].map((lvl) => ({
    level: lvl,
    count: students.filter((s) => s.level === lvl).length
  }));

  const avgRating = interactions.length > 0
    ? (interactions.reduce((acc, curr) => acc + (curr.rating || 0), 0) / interactions.length).toFixed(1)
    : '0.0';

  return (
    <div className="space-y-4">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900 transition-colors shadow-2xs">
        <div>
          <div className="flex items-center gap-2">
            <BarChart2 className="h-4 w-4 text-zinc-500" />
            <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 tracking-tight">
              Cohort Telemetry & Performance
            </h2>
          </div>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
            Real-time evaluation progress across 892 students, 30 evaluators, and 14 exam halls.
          </p>
        </div>

        <button
          onClick={onExportCSV}
          className="inline-flex items-center gap-1.5 h-8 px-3 rounded-md border border-zinc-200 bg-white text-xs font-medium text-zinc-800 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800 transition-colors cursor-pointer self-start sm:self-auto"
        >
          <Download className="h-3.5 w-3.5 text-zinc-500 dark:text-zinc-400" />
          <span>Export Summary (CSV)</span>
        </button>
      </div>

      {/* KPI Cards - Linear standard neutral surfaces */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900 transition-colors shadow-2xs">
          <div className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Total Enrolled Cohort</div>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 font-mono">{totalStudents}</span>
            <span className="text-[11px] text-zinc-400">candidates</span>
          </div>
          <div className="mt-2 text-[11px] text-zinc-500">14 Examination Halls</div>
        </div>

        <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900 transition-colors shadow-2xs">
          <div className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Level 0 Target Size</div>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 font-mono">{level0Total}</span>
            <span className="text-[11px] text-zinc-400">candidates</span>
          </div>
          <div className="mt-2 text-[11px] text-zinc-500 font-mono">
            {((level0Total / totalStudents) * 100).toFixed(0)}% of total cohort
          </div>
        </div>

        <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900 transition-colors shadow-2xs">
          <div className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Level 0 Completion</div>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 font-mono">{level0Cleared}</span>
            <span className="text-[11px] text-zinc-400">/ {level0Total} cleared</span>
          </div>
          <div className="mt-2 flex items-center gap-2 text-[11px]">
            <span className="text-amber-600 dark:text-amber-400 font-mono">{level0Revisit} need revisit</span>
          </div>
        </div>

        <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900 transition-colors shadow-2xs">
          <div className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Avg Candidate Score</div>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 font-mono">{avgRating}</span>
            <span className="text-[11px] text-zinc-400">/ 5.0</span>
          </div>
          <div className="mt-2 text-[11px] text-zinc-500 font-mono">
            {interactions.length} interactions logged
          </div>
        </div>
      </div>

      {/* Two columns: Cohort Breakdown & Evaluator Table */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Level Distribution */}
        <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900 transition-colors shadow-2xs">
          <div className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
            Cohort by Skill Level
          </div>
          <p className="text-[11px] text-zinc-500 mt-0.5 mb-3">
            Distribution across candidate milestones
          </p>

          <div className="space-y-3">
            {levelDistribution.map(({ level, count }) => {
              const pct = ((count / totalStudents) * 100).toFixed(1);
              return (
                <div key={level} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-zinc-800 dark:text-zinc-200">{level}</span>
                    <span className="font-mono text-zinc-500">{count} ({pct}%)</span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-zinc-900 dark:bg-zinc-100 transition-all duration-300"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Evaluator Activity Table */}
        <div className="lg:col-span-2 rounded-lg border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900 transition-colors shadow-2xs overflow-hidden">
          <div className="p-4 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
            <div>
              <div className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                Evaluator Activity Roster
              </div>
              <p className="text-[11px] text-zinc-500 mt-0.5">
                Real-time review throughput across instructors
              </p>
            </div>
          </div>

          <div className="overflow-x-auto max-h-72">
            <table className="w-full text-left text-xs">
              <thead className="sticky top-0 bg-zinc-50/90 dark:bg-zinc-900/90 border-b border-zinc-200 dark:border-zinc-800 text-zinc-500 font-medium">
                <tr>
                  <th className="py-2 pl-4 pr-2">Evaluator</th>
                  <th className="py-2 px-3">Exam Hall</th>
                  <th className="py-2 px-3 text-right">Assigned</th>
                  <th className="py-2 px-3 text-right">Evaluated</th>
                  <th className="py-2 px-3 text-right">Rate</th>
                  <th className="py-2 pl-2 pr-4 text-right">Filter</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/60 text-zinc-700 dark:text-zinc-300">
                {instructorSummaries.map((inst) => {
                  const rate = inst.assignedCount > 0
                    ? ((inst.completedCount / inst.assignedCount) * 100).toFixed(0)
                    : '0';

                  return (
                    <tr
                      key={inst.name}
                      className="hover:bg-zinc-50/60 dark:hover:bg-zinc-800/40 transition-colors"
                    >
                      <td className="py-2 pl-4 pr-2 font-medium text-zinc-900 dark:text-zinc-100">
                        {inst.name}
                      </td>
                      <td className="py-2 px-3 text-zinc-500 dark:text-zinc-400 font-mono">
                        {inst.primaryHall}
                      </td>
                      <td className="py-2 px-3 text-right font-mono text-zinc-600 dark:text-zinc-400">
                        {inst.assignedCount}
                      </td>
                      <td className="py-2 px-3 text-right font-mono font-medium text-zinc-900 dark:text-zinc-100">
                        {inst.completedCount}
                      </td>
                      <td className="py-2 px-3 text-right font-mono text-zinc-600 dark:text-zinc-400">
                        {rate}%
                      </td>
                      <td className="py-2 pl-2 pr-4 text-right">
                        <button
                          onClick={() => onSelectInstructor(inst.name)}
                          className="inline-flex items-center text-[11px] font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 cursor-pointer"
                        >
                          <span>View</span>
                          <ChevronRight className="h-3 w-3 ml-0.5" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
