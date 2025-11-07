"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Power,
  AlertTriangle,
  Clock,
  Activity,
  Settings,
  ArrowRight,
  Phone,
  Mail,
  MessageSquare,
  Users,
  Shield,
} from "lucide-react";
import { SITE_CONFIG } from "@/lib/contants";

interface Machine {
  id: number;
  name: string;
  status: "running" | "stopped";
  runningHours: number;
  alarmActive: boolean;
}

interface LogEntry {
  id: number;
  timestamp: string;
  machine: string;
  event: string;
  type: "info" | "warning" | "success";
}

export default function MachineMonitoringDemo() {
  const [machines, setMachines] = useState<Machine[]>([
    {
      id: 1,
      name: "Machine A",
      status: "stopped",
      runningHours: 0,
      alarmActive: false,
    },
    {
      id: 2,
      name: "Machine B",
      status: "stopped",
      runningHours: 0,
      alarmActive: false,
    },
    {
      id: 3,
      name: "Machine C",
      status: "stopped",
      runningHours: 0,
      alarmActive: false,
    },
  ]);

  const [logs, setLogs] = useState<LogEntry[]>([]);

  // Add log entry with unique ID
  const addLog = (
    machine: string,
    event: string,
    type: "info" | "warning" | "success"
  ) => {
    const timestamp = new Date().toLocaleString("id-ID", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

    setLogs((prev) => [
      {
        id: Date.now() + Math.random(),
        timestamp,
        machine,
        event,
        type,
      },
      ...prev.slice(0, 19),
    ]);
  };

  // Toggle machine status
  const toggleMachine = (id: number) => {
    const machine = machines.find((m) => m.id === id);
    if (!machine) return;

    const newStatus = machine.status === "running" ? "stopped" : "running";

    // Add log first
    addLog(
      machine.name,
      newStatus === "running" ? "Machine started" : "Machine stopped",
      newStatus === "running" ? "success" : "info"
    );

    // Then update state
    setMachines((prev) =>
      prev.map((m) => (m.id === id ? { ...m, status: newStatus } : m))
    );
  };

  // Toggle alarm
  const toggleAlarm = (id: number) => {
    const machine = machines.find((m) => m.id === id);
    if (!machine) return;

    const newAlarmState = !machine.alarmActive;

    // Add log first
    addLog(
      machine.name,
      newAlarmState ? "Alarm triggered" : "Alarm cleared",
      newAlarmState ? "warning" : "success"
    );

    // Then update state
    setMachines((prev) =>
      prev.map((m) => (m.id === id ? { ...m, alarmActive: newAlarmState } : m))
    );
  };

  // Reset machine running hours
  const resetRunningHours = (id: number) => {
    const machine = machines.find((m) => m.id === id);
    if (!machine) return;

    // Add log first
    addLog(machine.name, "Running hours reset", "info");

    // Then update state
    setMachines((prev) =>
      prev.map((m) => (m.id === id ? { ...m, runningHours: 0 } : m))
    );
  };

  // Update running hours every second for running machines
  useEffect(() => {
    const interval = setInterval(() => {
      setMachines((prev) =>
        prev.map((machine) => {
          if (machine.status === "running") {
            return { ...machine, runningHours: machine.runningHours + 1 };
          }
          return machine;
        })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Format seconds to HH:MM:SS
  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="pt-24 pb-12 px-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold text-slate-900">
              Machine Monitoring Demo
            </h1>
            <p className="text-slate-600">
              Real-time industrial automation monitoring system
            </p>
            <Alert className="max-w-2xl mx-auto mt-4">
              <Activity className="h-4 w-4" />
              <AlertDescription>
                This is a live demonstration with simulated data. Try the
                control buttons to interact with the machines.
              </AlertDescription>
            </Alert>
          </div>

          {/* Machine Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {machines.map((machine) => (
              <Card
                key={machine.id}
                className={`transition-all duration-300 ${
                  machine.status === "running"
                    ? "ring-2 ring-green-500 shadow-lg shadow-green-100"
                    : ""
                } ${machine.alarmActive ? "ring-2 ring-red-500 shadow-lg shadow-red-100" : ""}`}
              >
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{machine.name}</span>
                    <Badge
                      variant={
                        machine.status === "running" ? "default" : "secondary"
                      }
                      className={
                        machine.status === "running"
                          ? "bg-green-500 hover:bg-green-600"
                          : "bg-slate-400"
                      }
                    >
                      {machine.status === "running" ? "RUNNING" : "STOPPED"}
                    </Badge>
                  </CardTitle>
                  <CardDescription>
                    Monitor and control machine operations
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Status Indicators */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Power
                          className={`h-5 w-5 ${
                            machine.status === "running"
                              ? "text-green-500"
                              : "text-slate-400"
                          }`}
                        />
                        <span className="text-sm font-medium text-slate-700">
                          Status
                        </span>
                      </div>
                      <span
                        className={`text-sm font-semibold ${
                          machine.status === "running"
                            ? "text-green-600"
                            : "text-slate-500"
                        }`}
                      >
                        {machine.status === "running" ? "ON" : "OFF"}
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Clock className="h-5 w-5 text-blue-500" />
                        <span className="text-sm font-medium text-slate-700">
                          Running Hours
                        </span>
                      </div>
                      <span className="text-sm font-mono font-semibold text-blue-600">
                        {formatTime(machine.runningHours)}
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <AlertTriangle
                          className={`h-5 w-5 ${
                            machine.alarmActive
                              ? "text-red-500"
                              : "text-slate-400"
                          }`}
                        />
                        <span className="text-sm font-medium text-slate-700">
                          Alarm
                        </span>
                      </div>
                      <Badge
                        variant={
                          machine.alarmActive ? "destructive" : "secondary"
                        }
                        className={machine.alarmActive ? "animate-pulse" : ""}
                      >
                        {machine.alarmActive ? "ACTIVE" : "NORMAL"}
                      </Badge>
                    </div>
                  </div>

                  {/* Control Buttons */}
                  <div className="pt-4 border-t space-y-2">
                    <p className="text-xs font-semibold text-slate-600 mb-2">
                      CONTROLS
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        onClick={() => toggleMachine(machine.id)}
                        variant={
                          machine.status === "running"
                            ? "destructive"
                            : "default"
                        }
                        className="w-full"
                        size="sm"
                      >
                        {machine.status === "running" ? "Stop" : "Start"}
                      </Button>
                      <Button
                        onClick={() => toggleAlarm(machine.id)}
                        variant={
                          machine.alarmActive ? "outline" : "destructive"
                        }
                        className="w-full"
                        size="sm"
                      >
                        {machine.alarmActive ? "Clear Alarm" : "Trigger Alarm"}
                      </Button>
                    </div>
                    <Button
                      onClick={() => resetRunningHours(machine.id)}
                      variant="outline"
                      className="w-full"
                      size="sm"
                    >
                      Reset Hours
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Activity Log */}
          <Card>
            <CardHeader>
              <CardTitle>Activity Log</CardTitle>
              <CardDescription>
                Real-time event history (resets on page refresh)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[180px]">Timestamp</TableHead>
                      <TableHead>Machine</TableHead>
                      <TableHead>Event</TableHead>
                      <TableHead className="w-[100px]">Type</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {logs.length === 0 ? (
                      <TableRow>
                        <TableCell
                          colSpan={4}
                          className="text-center text-slate-500 py-8"
                        >
                          No activity yet. Start interacting with the machines
                          to see logs.
                        </TableCell>
                      </TableRow>
                    ) : (
                      logs.map((log) => (
                        <TableRow key={log.id}>
                          <TableCell className="font-mono text-xs">
                            {log.timestamp}
                          </TableCell>
                          <TableCell className="font-medium">
                            {log.machine}
                          </TableCell>
                          <TableCell>{log.event}</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                log.type === "warning"
                                  ? "destructive"
                                  : log.type === "success"
                                    ? "default"
                                    : "secondary"
                              }
                              className={
                                log.type === "success"
                                  ? "bg-green-500 hover:bg-green-600"
                                  : ""
                              }
                            >
                              {log.type}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Enhanced CTA Section */}
      {/* Enhanced CTA Section - Products Page Style */}
      <section className="py-16 bg-gradient-to-br from-blue-900 to-blue-950 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Need Custom Engineering Solutions?
            </h2>
            <p className="text-xl text-blue-100 mb-10 leading-relaxed">
              Our experienced engineers provide tailored automation solutions
              for your specific industrial requirements. Get expert consultation
              today.
            </p>

            {/* Enhanced Single Button with proper spacing */}
            <Link
              href="/contact"
              className="group relative inline-flex items-center justify-center px-8 py-4 bg-white text-blue-900 font-semibold rounded-lg hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 mb-10"
            >
              <Settings className="h-5 w-5 mr-2" />
              <span>Get Engineering Consultation</span>
              <ArrowRight className="h-5 w-5 ml-2 transition-transform duration-300 group-hover:translate-x-2" />

              {/* Shine effect on hover */}
              <div className="absolute inset-0 rounded-lg overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              </div>
            </Link>

            {/* Contact Information Card */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 max-w-5xl mx-auto">
              <h3 className="text-white font-semibold mb-6 text-lg">
                Direct Contact Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Phone Contact */}
                <a
                  href={`tel:${SITE_CONFIG.company.phone}`}
                  className="group flex items-center gap-3 p-4 rounded-lg hover:bg-white/10 transition-all duration-300 transform hover:scale-105"
                >
                  <div className="flex-shrink-0">
                    <Phone className="h-6 w-6 text-blue-200 group-hover:rotate-12 transition-transform duration-300" />
                  </div>
                  <div className="text-left min-w-0">
                    <p className="text-xs text-blue-200 uppercase tracking-wide mb-1">
                      Call Direct
                    </p>
                    <p className="font-semibold text-white text-sm group-hover:text-blue-100 transition-colors">
                      {SITE_CONFIG.company.phone}
                    </p>
                  </div>
                </a>

                {/* Email Contact */}
                <a
                  href={`mailto:${SITE_CONFIG.company.email}`}
                  className="group flex items-center gap-3 p-4 rounded-lg hover:bg-white/10 transition-all duration-300 transform hover:scale-105"
                >
                  <div className="flex-shrink-0">
                    <Mail className="h-6 w-6 text-blue-200 group-hover:rotate-12 transition-transform duration-300" />
                  </div>
                  <div className="text-left min-w-0">
                    <p className="text-xs text-blue-200 uppercase tracking-wide mb-1">
                      Email Us
                    </p>
                    <p className="font-semibold text-white text-sm group-hover:text-blue-100 transition-colors truncate">
                      {SITE_CONFIG.company.email}
                    </p>
                  </div>
                </a>

                {/* WhatsApp Contact */}
                <a
                  href="https://api.whatsapp.com/send/?phone=6285210067755&text=Halo PJMOtomasi, saya membutuhkan technical support untuk automation"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 p-4 rounded-lg hover:bg-white/10 transition-all duration-300 transform hover:scale-105"
                >
                  <div className="flex-shrink-0">
                    <MessageSquare className="h-6 w-6 text-blue-200 group-hover:rotate-12 transition-transform duration-300" />
                  </div>
                  <div className="text-left min-w-0">
                    <p className="text-xs text-blue-200 uppercase tracking-wide mb-1">
                      WhatsApp
                    </p>
                    <p className="font-semibold text-white text-sm group-hover:text-blue-100 transition-colors">
                      Iqbal - 085210067755 <br />
                      Tegar - 081112003634
                    </p>
                  </div>
                </a>
              </div>

              {/* Additional Info */}
              <div className="mt-6 pt-6 border-t border-white/20">
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-blue-100">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>Response within 2 hours</span>
                  </div>
                  <div className="hidden sm:block w-1 h-1 bg-blue-200 rounded-full"></div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    <span>8+ Years Experience</span>
                  </div>
                  <div className="hidden sm:block w-1 h-1 bg-blue-200 rounded-full"></div>
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4" />
                    <span>Certified Solutions</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
