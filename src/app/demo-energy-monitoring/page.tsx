/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
"use client";

// ============================================
// ENERGY MONITORING DEMO PAGE
// Created: 2024
// Purpose: Showcase real-time energy monitoring capabilities
// Features: Multi-plant monitoring, power analytics, cost tracking
// ============================================

// ============================================
// SECTION 1: IMPORTS
// ============================================
import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  Zap,
  TrendingUp,
  DollarSign,
  Activity,
  Factory,
  Gauge,
  Leaf,
  Settings,
  ArrowRight,
  Phone,
  Mail,
  MessageSquare,
  Users,
  Shield,
  Clock,
} from "lucide-react";
import { SITE_CONFIG } from "@/lib/contants";

// ============================================
// SECTION 2: TYPESCRIPT INTERFACES
// ============================================
interface Plant {
  id: number;
  name: string;
  location: string;
  status: "running" | "stopped" | "maintenance";
  power: number; // kW - real-time
  voltage: number; // Volt
  current: number; // Ampere
  powerFactor: number; // 0-1
  energyToday: number; // kWh accumulated
  costToday: number; // Rupiah
  efficiency: number; // %
  carbonToday: number; // tons CO2
}

interface ChartDataPoint {
  time: string;
  plant1: number;
  plant2: number;
  plant3: number;
}

interface DataLogEntry {
  id: number;
  timestamp: string;
  plant1Energy: number;
  plant2Energy: number;
  plant3Energy: number;
  totalEnergy: number;
}

// ============================================
// SECTION 3: CONSTANTS & INITIAL DATA
// ============================================
const INITIAL_PLANTS: Plant[] = [
  {
    id: 1,
    name: "Plant 1",
    location: "Production Line A",
    status: "running",
    power: 180.5,
    voltage: 385,
    current: 275,
    powerFactor: 0.95,
    energyToday: 4320,
    costToday: 1728000,
    efficiency: 92,
    carbonToday: 3.2,
  },
  {
    id: 2,
    name: "Plant 2",
    location: "Assembly Line B",
    status: "running",
    power: 95.3,
    voltage: 380,
    current: 145,
    powerFactor: 0.89,
    energyToday: 2280,
    costToday: 912000,
    efficiency: 88,
    carbonToday: 1.7,
  },
  {
    id: 3,
    name: "Plant 3",
    location: "Packaging & Warehouse",
    status: "running",
    power: 210.7,
    voltage: 390,
    current: 315,
    powerFactor: 0.93,
    energyToday: 5040,
    costToday: 2016000,
    efficiency: 90,
    carbonToday: 3.7,
  },
];

const ELECTRICITY_RATE = 1445; // Rupiah per kWh (PLN industrial rate)

const EVENT_TEMPLATES = [
  { event: "Peak demand detected", type: "warning" as const },
  { event: "Power factor optimized", type: "success" as const },
  { event: "Normal operation resumed", type: "info" as const },
  { event: "Load increased", type: "info" as const },
  { event: "Load decreased", type: "success" as const },
  { event: "Voltage stabilized", type: "success" as const },
  { event: "High consumption alert", type: "warning" as const },
  { event: "Energy target achieved", type: "success" as const },
];

// ============================================
// SECTION 4: UTILITY FUNCTIONS
// ============================================

// Generate 24-hour chart data with realistic patterns
const generateChartData = (): ChartDataPoint[] => {
  const data: ChartDataPoint[] = [];

  for (let i = 0; i < 24; i++) {
    // Simulate realistic industrial patterns
    // Night: lower consumption (00:00-06:00)
    // Day shift: high consumption (07:00-15:00)
    // Evening shift: medium consumption (16:00-22:00)
    // Night: lower again (23:00)

    let timeMultiplier = 1;
    if (i >= 0 && i < 6)
      timeMultiplier = 0.4; // Night - minimal
    else if (i >= 7 && i < 15)
      timeMultiplier = 1.0; // Day - peak
    else if (i >= 16 && i < 22)
      timeMultiplier = 0.7; // Evening - medium
    else timeMultiplier = 0.5; // Late night

    data.push({
      time: `${i.toString().padStart(2, "0")}:00`,
      plant1: (150 + Math.random() * 60) * timeMultiplier, // 150-210 kW base
      plant2: (70 + Math.random() * 50) * timeMultiplier, // 70-120 kW base
      plant3: (180 + Math.random() * 60) * timeMultiplier, // 180-240 kW base
    });
  }

  return data;
};

// Format number to Indonesian Rupiah
const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

// Format number with comma separator
const formatNumber = (num: number, decimals: number = 1): string => {
  return num.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

// Get status badge color
const getStatusColor = (
  status: Plant["status"]
): "default" | "destructive" | "secondary" => {
  switch (status) {
    case "running":
      return "default";
    case "stopped":
      return "secondary";
    case "maintenance":
      return "destructive";
    default:
      return "default";
  }
};

// Get power factor status
const getPowerFactorStatus = (pf: number): { label: string; color: string } => {
  if (pf >= 0.95) return { label: "Excellent", color: "text-green-600" };
  if (pf >= 0.9) return { label: "Good", color: "text-blue-600" };
  if (pf >= 0.85) return { label: "Fair", color: "text-yellow-600" };
  return { label: "Poor", color: "text-red-600" };
};

// Get efficiency status
const getEfficiencyStatus = (
  efficiency: number
): { label: string; color: string } => {
  if (efficiency >= 90) return { label: "Excellent", color: "text-green-600" };
  if (efficiency >= 85) return { label: "Good", color: "text-blue-600" };
  if (efficiency >= 80) return { label: "Fair", color: "text-yellow-600" };
  return { label: "Poor", color: "text-red-600" };
};

const PowerChart = React.memo<{ data: ChartDataPoint[] }>(({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
        <XAxis dataKey="time" stroke="#64748b" style={{ fontSize: "12px" }} />
        <YAxis
          stroke="#64748b"
          style={{ fontSize: "12px" }}
          label={{
            value: "Power (kW)",
            angle: -90,
            position: "insideLeft",
            style: { fontSize: "12px", fill: "#64748b" },
          }}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "white",
            border: "1px solid #e2e8f0",
            borderRadius: "8px",
            fontSize: "12px",
          }}
          formatter={(value: number) => `${value.toFixed(1)} kW`}
        />
        <Legend wrapperStyle={{ fontSize: "12px", paddingTop: "10px" }} />

        {/* CRITICAL: Disable animation! */}
        <Line
          type="monotone"
          dataKey="plant1"
          stroke="#3b82f6"
          strokeWidth={2}
          name="Plant 1"
          dot={false}
          isAnimationActive={false} // ← IMPORTANT!
        />
        <Line
          type="monotone"
          dataKey="plant2"
          stroke="#10b981"
          strokeWidth={2}
          name="Plant 2"
          dot={false}
          isAnimationActive={false} // ← IMPORTANT!
        />
        <Line
          type="monotone"
          dataKey="plant3"
          stroke="#f59e0b"
          strokeWidth={2}
          name="Plant 3"
          dot={false}
          isAnimationActive={false} // ← IMPORTANT!
        />
      </LineChart>
    </ResponsiveContainer>
  );
});

PowerChart.displayName = "PowerChart";

// ============================================
// SECTION 5: MAIN COMPONENT
// ============================================
export default function EnergyMonitoringDemo() {
  // ============================================
  // STATE MANAGEMENT
  // ============================================
  const [plants, setPlants] = useState<Plant[]>(INITIAL_PLANTS);
  const [dataLogs, setDataLogs] = useState<DataLogEntry[]>([]);
  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
  const [peakPower, setPeakPower] = useState<number>(520);

  // ============================================
  // COMPUTED VALUES (Summary Metrics)
  // ============================================

  // Memoize computed values (tambahkan ini)
  const totalPower = useMemo(
    () => plants.reduce((sum, plant) => sum + plant.power, 0),
    [plants]
  );

  const totalCostToday = useMemo(
    () => plants.reduce((sum, plant) => sum + plant.costToday, 0),
    [plants]
  );

  const avgPowerFactor = useMemo(
    () =>
      plants.reduce((sum, plant) => sum + plant.powerFactor, 0) / plants.length,
    [plants]
  );

  // ============================================
  // HELPER FUNCTIONS
  // ============================================
  // HAPUS function addLog yang lama, GANTI dengan:

  // Add data log entry (kWh snapshot every 5 seconds)
  const addDataLog = () => {
    const timestamp = new Date().toLocaleString("id-ID", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

    setDataLogs((prev) => [
      {
        id: Date.now() + Math.random(),
        timestamp,
        plant1Energy: plants[0].energyToday,
        plant2Energy: plants[1].energyToday,
        plant3Energy: plants[2].energyToday,
        totalEnergy: plants.reduce((sum, p) => sum + p.energyToday, 0),
      },
      ...prev.slice(0, 19), // Keep max 20 logs
    ]);
  };

  // ============================================
  // CHART ANIMATION - Append Method (No Flash!)
  // ============================================
  useEffect(() => {
    const VISIBLE_HOURS = 10;
    const UPDATE_INTERVAL = 3000;

    // Generate full 24h data pool
    const full24HoursData = generateChartData();

    // Initialize with first 10 hours
    setChartData(full24HoursData.slice(0, VISIBLE_HOURS));

    let dataIndex = VISIBLE_HOURS; // Start from 11th data

    const intervalId = setInterval(() => {
      // Get next data point (with loop)
      const nextDataPoint = full24HoursData[dataIndex % 24];

      // Update chart data (append new, remove oldest)
      setChartData((prevData) => {
        const updated = [...prevData, nextDataPoint];

        // Keep only latest 10 hours
        if (updated.length > VISIBLE_HOURS) {
          updated.shift(); // Remove first (oldest) element
        }

        return updated;
      });

      // Move to next index
      dataIndex++;
    }, UPDATE_INTERVAL);

    return () => clearInterval(intervalId);
  }, []);
  // ============================================
  // EFFECTS (Real-time Updates)
  // ============================================

  // Update 1: Power fluctuation (every 2 seconds)
  useEffect(() => {
    const interval = setInterval(() => {
      setPlants((prev) =>
        prev.map((plant) => {
          if (plant.status !== "running") return plant;

          // Random fluctuation ±5kW
          const fluctuation = (Math.random() - 0.5) * 10;
          const newPower = Math.max(
            50,
            Math.min(300, plant.power + fluctuation)
          );

          // Recalculate current based on power (I = P / (V * PF * √3))
          const newCurrent = newPower / (plant.voltage * plant.powerFactor);

          return {
            ...plant,
            power: newPower,
            current: newCurrent,
          };
        })
      );
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // Update 2: Energy accumulation (every second)
  useEffect(() => {
    const interval = setInterval(() => {
      setPlants((prev) =>
        prev.map((plant) => {
          if (plant.status !== "running") return plant;

          // kWh = kW × hours, per second = kW / 3600
          const energyIncrement = plant.power / 3600;
          const newEnergy = plant.energyToday + energyIncrement;
          const newCost = newEnergy * ELECTRICITY_RATE;
          const newCarbon = newEnergy * 0.74; // 0.74 kg CO2 per kWh (Indonesia grid average)

          return {
            ...plant,
            energyToday: newEnergy,
            costToday: newCost,
            carbonToday: newCarbon / 1000, // Convert to tons
          };
        })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  {
    /* ============================================
    DATA LOG - kWh Records Every 5 Seconds
============================================ */
  }
  <Card>
    <CardHeader>
      <CardTitle>Energy Data Log</CardTitle>
      <CardDescription>
        kWh snapshot recorded every 5 seconds (showing 10 latest, max 20
        entries)
      </CardDescription>
    </CardHeader>
    <CardContent>
      <div className="rounded-md border max-h-[400px] overflow-y-auto">
        <Table>
          <TableHeader className="sticky top-0 bg-white z-10">
            <TableRow>
              <TableHead className="w-[180px]">Timestamp</TableHead>
              <TableHead className="text-right">Plant 1 (kWh)</TableHead>
              <TableHead className="text-right">Plant 2 (kWh)</TableHead>
              <TableHead className="text-right">Plant 3 (kWh)</TableHead>
              <TableHead className="text-right">Total (kWh)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {dataLogs.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-center text-slate-500 py-8"
                >
                  Collecting data... First log will appear in 5 seconds.
                </TableCell>
              </TableRow>
            ) : (
              dataLogs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell className="font-mono text-xs">
                    {log.timestamp}
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    {formatNumber(log.plant1Energy, 2)}
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    {formatNumber(log.plant2Energy, 2)}
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    {formatNumber(log.plant3Energy, 2)}
                  </TableCell>
                  <TableCell className="text-right font-bold">
                    {formatNumber(log.totalEnergy, 2)}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </CardContent>
  </Card>;

  // ============================================
  // RENDER: JSX
  // ============================================
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="pt-24 pb-12 px-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* ============================================
              HEADER SECTION
          ============================================ */}
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold text-slate-900">
              Energy Monitoring Demo
            </h1>
            <p className="text-slate-600">
              Real-time industrial power management system
            </p>
            <Alert className="max-w-2xl mx-auto mt-4">
              <Activity className="h-4 w-4" />
              <AlertDescription>
                This is a live demonstration with simulated data. Real-time
                updates every second showing power consumption, cost analysis,
                and efficiency metrics.
              </AlertDescription>
            </Alert>
          </div>

          {/* ============================================
              SUMMARY CARDS (4 Metrics)
          ============================================ */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Total Power */}
            <Card>
              <CardHeader className="pb-3">
                <CardDescription className="flex items-center gap-2">
                  <Zap className="h-4 w-4" />
                  Total Power
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-slate-900">
                  {formatNumber(totalPower, 1)} kW
                </div>
                <p className="text-xs text-slate-500 mt-1">Live monitoring</p>
              </CardContent>
            </Card>

            {/* Daily Cost */}
            <Card>
              <CardHeader className="pb-3">
                <CardDescription className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4" />
                  Daily Cost
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-slate-900">
                  {formatCurrency(totalCostToday)}
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  @ Rp {formatNumber(ELECTRICITY_RATE, 0)}/kWh
                </p>
              </CardContent>
            </Card>

            {/* Peak Demand */}
            <Card>
              <CardHeader className="pb-3">
                <CardDescription className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Peak Demand
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-slate-900">
                  {formatNumber(peakPower, 1)} kW
                </div>
                <p className="text-xs text-slate-500 mt-1">Today's maximum</p>
              </CardContent>
            </Card>

            {/* Average Power Factor */}
            <Card>
              <CardHeader className="pb-3">
                <CardDescription className="flex items-center gap-2">
                  <Gauge className="h-4 w-4" />
                  Avg Power Factor
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-slate-900">
                  {avgPowerFactor.toFixed(2)}
                </div>
                <p
                  className={`text-xs font-semibold mt-1 ${
                    getPowerFactorStatus(avgPowerFactor).color
                  }`}
                >
                  {getPowerFactorStatus(avgPowerFactor).label}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* ============================================
              PLANT CARDS (3 Plants)
          ============================================ */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {plants.map((plant) => {
              const pfStatus = getPowerFactorStatus(plant.powerFactor);
              const effStatus = getEfficiencyStatus(plant.efficiency);

              return (
                <Card key={plant.id} className="relative overflow-hidden">
                  {/* Status indicator line */}
                  <div
                    className={`absolute top-0 left-0 right-0 h-1 ${
                      plant.status === "running"
                        ? "bg-green-500"
                        : plant.status === "maintenance"
                          ? "bg-yellow-500"
                          : "bg-gray-400"
                    }`}
                  />

                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          <Factory className="h-5 w-5" />
                          {plant.name}
                        </CardTitle>
                        <CardDescription>{plant.location}</CardDescription>
                      </div>
                      <Badge variant={getStatusColor(plant.status)}>
                        {plant.status === "running" ? "●" : "○"}{" "}
                        {plant.status.charAt(0).toUpperCase() +
                          plant.status.slice(1)}
                      </Badge>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Real-time Metrics Grid */}
                    <div className="grid grid-cols-2 gap-3">
                      {/* Power */}
                      <div className="bg-slate-50 p-3 rounded-lg">
                        <p className="text-xs text-slate-600 mb-1">Power</p>
                        <p className="text-lg font-bold text-slate-900">
                          {formatNumber(plant.power)} kW
                        </p>
                      </div>

                      {/* Voltage */}
                      <div className="bg-slate-50 p-3 rounded-lg">
                        <p className="text-xs text-slate-600 mb-1">Voltage</p>
                        <p className="text-lg font-bold text-slate-900">
                          {Math.round(plant.voltage)} V
                        </p>
                      </div>

                      {/* Current */}
                      <div className="bg-slate-50 p-3 rounded-lg">
                        <p className="text-xs text-slate-600 mb-1">Current</p>
                        <p className="text-lg font-bold text-slate-900">
                          {formatNumber(plant.current, 0)} A
                        </p>
                      </div>

                      {/* Power Factor */}
                      <div className="bg-slate-50 p-3 rounded-lg">
                        <p className="text-xs text-slate-600 mb-1">
                          Power Factor
                        </p>
                        <p className={`text-lg font-bold ${pfStatus.color}`}>
                          {plant.powerFactor.toFixed(2)}
                        </p>
                      </div>
                    </div>

                    {/* Energy & Cost */}
                    <div className="space-y-2 pt-2 border-t">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-slate-600">
                          Energy Today
                        </span>
                        <span className="font-semibold text-slate-900">
                          {formatNumber(plant.energyToday, 1)} kWh
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-slate-600">
                          Cost Today
                        </span>
                        <span className="font-semibold text-slate-900">
                          {formatCurrency(plant.costToday)}
                        </span>
                      </div>
                    </div>

                    {/* Efficiency & Carbon */}
                    <div className="flex justify-between items-center pt-2 border-t text-sm">
                      <div className="flex items-center gap-2">
                        <Gauge className="h-4 w-4 text-slate-500" />
                        <span className="text-slate-600">Efficiency:</span>
                        <span className={`font-semibold ${effStatus.color}`}>
                          {plant.efficiency}%
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Leaf className="h-4 w-4 text-green-600" />
                        <span className="text-slate-600">
                          {formatNumber(plant.carbonToday, 2)} t CO₂
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* ============================================
    POWER COMPARISON CHART
============================================ */}
          <Card>
            <CardHeader>
              <CardTitle>Power Consumption Comparison</CardTitle>
              <CardDescription>
                24-hour trend analysis across all plants
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Ganti dari <ResponsiveContainer> jadi: */}
              <PowerChart data={chartData} />
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
