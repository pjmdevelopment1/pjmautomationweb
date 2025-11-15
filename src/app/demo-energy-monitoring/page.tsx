"use client";

// ============================================
// ENERGY MONITORING DEMO - CLEAN VERSION
// Created: November 2024
// Features: Fixed 24h data, realistic fluctuations, perfect sync
// ============================================

// ============================================
// IMPORTS
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
// INTERFACES
// ============================================
interface Plant {
  id: number;
  name: string;
  location: string;
  status: "running" | "stopped" | "maintenance";
  basePower: number;
  baseVoltage: number;
  powerFactor: number;
  power: number;
  voltage: number;
  current: number;
  energyToday: number;
  costToday: number;
  carbonToday: number;
  efficiency: number;
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
// FIXED 24 HOURS DATA (Pre-determined)
// ============================================
const FIXED_24H_DATA: ChartDataPoint[] = [
  // 00:00-05:00: Night shift minimal (30%)
  { time: "00:00", plant1: 54.2, plant2: 28.5, plant3: 63.1 },
  { time: "01:00", plant1: 53.8, plant2: 28.1, plant3: 62.5 },
  { time: "02:00", plant1: 55.1, plant2: 29.2, plant3: 64.3 },
  { time: "03:00", plant1: 54.5, plant2: 28.8, plant3: 63.7 },
  { time: "04:00", plant1: 53.2, plant2: 28.0, plant3: 62.2 },
  { time: "05:00", plant1: 54.8, plant2: 28.9, plant3: 63.9 },

  // 06:00-07:00: Morning ramp up (50% → 75%)
  { time: "06:00", plant1: 88.5, plant2: 46.8, plant3: 103.2 },
  { time: "07:00", plant1: 132.7, plant2: 70.1, plant3: 154.8 },

  // 08:00-15:00: Day shift peak (100%)
  { time: "08:00", plant1: 176.4, plant2: 93.2, plant3: 205.8 },
  { time: "09:00", plant1: 179.8, plant2: 95.0, plant3: 209.5 },
  { time: "10:00", plant1: 182.3, plant2: 96.3, plant3: 212.4 },
  { time: "11:00", plant1: 178.1, plant2: 94.1, plant3: 207.6 },
  { time: "12:00", plant1: 180.9, plant2: 95.6, plant3: 210.8 },
  { time: "13:00", plant1: 183.5, plant2: 97.0, plant3: 213.9 },
  { time: "14:00", plant1: 181.7, plant2: 96.0, plant3: 211.9 },
  { time: "15:00", plant1: 177.3, plant2: 93.7, plant3: 206.7 },

  // 16:00-17:00: Evening ramp down (85% → 70%)
  { time: "16:00", plant1: 154.2, plant2: 81.5, plant3: 179.7 },
  { time: "17:00", plant1: 127.8, plant2: 67.5, plant3: 148.9 },

  // 18:00-21:00: Evening shift (70%)
  { time: "18:00", plant1: 125.3, plant2: 66.2, plant3: 146.1 },
  { time: "19:00", plant1: 128.1, plant2: 67.7, plant3: 149.3 },
  { time: "20:00", plant1: 126.5, plant2: 66.8, plant3: 147.5 },
  { time: "21:00", plant1: 124.9, plant2: 66.0, plant3: 145.6 },

  // 22:00-23:00: Night transition (50%)
  { time: "22:00", plant1: 89.2, plant2: 47.1, plant3: 104.0 },
  { time: "23:00", plant1: 90.5, plant2: 47.8, plant3: 105.5 },
];

// ============================================
// CONSTANTS
// ============================================
const ELECTRICITY_RATE = 1445; // Rupiah per kWh
const CARBON_FACTOR = 0.74; // kg CO2 per kWh (Indonesia grid)
const CHART_UPDATE_INTERVAL = 3000; // 3 seconds
const VISIBLE_HOURS = 10;

// Calculate initial accumulated energy (00:00-09:00)
const calculateInitialEnergy = (
  plantKey: "plant1" | "plant2" | "plant3"
): number => {
  return FIXED_24H_DATA.slice(0, 10).reduce(
    (sum, hour) => sum + hour[plantKey],
    0
  );
};

// Initial plants state
const INITIAL_PLANTS: Plant[] = [
  {
    id: 1,
    name: "Plant 1",
    location: "Production Line A",
    status: "running",
    basePower: 180,
    baseVoltage: 385,
    powerFactor: 0.95,
    power: 179.8,
    voltage: 385,
    current: 274.2,
    energyToday: calculateInitialEnergy("plant1"),
    costToday: calculateInitialEnergy("plant1") * ELECTRICITY_RATE,
    carbonToday: (calculateInitialEnergy("plant1") * CARBON_FACTOR) / 1000,
    efficiency: 92,
  },
  {
    id: 2,
    name: "Plant 2",
    location: "Assembly Line B",
    status: "running",
    basePower: 95,
    baseVoltage: 380,
    powerFactor: 0.89,
    power: 95.0,
    voltage: 380,
    current: 143.8,
    energyToday: calculateInitialEnergy("plant2"),
    costToday: calculateInitialEnergy("plant2") * ELECTRICITY_RATE,
    carbonToday: (calculateInitialEnergy("plant2") * CARBON_FACTOR) / 1000,
    efficiency: 88,
  },
  {
    id: 3,
    name: "Plant 3",
    location: "Packaging & Warehouse",
    status: "running",
    basePower: 210,
    baseVoltage: 390,
    powerFactor: 0.93,
    power: 209.5,
    voltage: 390,
    current: 312.1,
    energyToday: calculateInitialEnergy("plant3"),
    costToday: calculateInitialEnergy("plant3") * ELECTRICITY_RATE,
    carbonToday: (calculateInitialEnergy("plant3") * CARBON_FACTOR) / 1000,
    efficiency: 90,
  },
];

// ============================================
// UTILITY FUNCTIONS
// ============================================
const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

const formatNumber = (num: number, decimals: number = 1): string => {
  return num.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

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

const getPowerFactorStatus = (pf: number): { label: string; color: string } => {
  if (pf >= 0.95) return { label: "Excellent", color: "text-green-600" };
  if (pf >= 0.9) return { label: "Good", color: "text-blue-600" };
  if (pf >= 0.85) return { label: "Fair", color: "text-yellow-600" };
  return { label: "Poor", color: "text-red-600" };
};

const getEfficiencyStatus = (
  efficiency: number
): { label: string; color: string } => {
  if (efficiency >= 90) return { label: "Excellent", color: "text-green-600" };
  if (efficiency >= 85) return { label: "Good", color: "text-blue-600" };
  if (efficiency >= 80) return { label: "Fair", color: "text-yellow-600" };
  return { label: "Poor", color: "text-red-600" };
};

// ============================================
// CHART COMPONENT (Memoized)
// ============================================
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
        <Line
          type="monotone"
          dataKey="plant1"
          stroke="#3b82f6"
          strokeWidth={2}
          name="Plant 1"
          dot={false}
          //   isAnimationActive={false}
        />
        <Line
          type="monotone"
          dataKey="plant2"
          stroke="#10b981"
          strokeWidth={2}
          name="Plant 2"
          dot={false}
          //   isAnimationActive={false}
        />
        <Line
          type="monotone"
          dataKey="plant3"
          stroke="#f59e0b"
          strokeWidth={2}
          name="Plant 3"
          dot={false}
          //   isAnimationActive={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
});

PowerChart.displayName = "PowerChart";

// ============================================
// MAIN COMPONENT
// ============================================
export default function EnergyMonitoringDemo() {
  // ============================================
  // STATE
  // ============================================
  const [plants, setPlants] = useState<Plant[]>(INITIAL_PLANTS);
  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
  const [dataLogs, setDataLogs] = useState<DataLogEntry[]>([]);
  const [peakPower, setPeakPower] = useState<number>(520);

  // ============================================
  // COMPUTED VALUES
  // ============================================
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

  // Calculate current chart window average for each plant
  const getChartAverages = (currentChartData: ChartDataPoint[]) => {
    const plant1Avg =
      currentChartData.reduce((sum, d) => sum + d.plant1, 0) /
      currentChartData.length;
    const plant2Avg =
      currentChartData.reduce((sum, d) => sum + d.plant2, 0) /
      currentChartData.length;
    const plant3Avg =
      currentChartData.reduce((sum, d) => sum + d.plant3, 0) /
      currentChartData.length;

    return { plant1Avg, plant2Avg, plant3Avg };
  };

  // Log current chart data
  const logChartData = (currentChartData: ChartDataPoint[]) => {
    const timestamp = new Date().toLocaleString("id-ID", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

    const { plant1Avg, plant2Avg, plant3Avg } =
      getChartAverages(currentChartData);

    setDataLogs((prev) => [
      {
        id: Date.now() + Math.random(),
        timestamp,
        plant1Energy: plant1Avg,
        plant2Energy: plant2Avg,
        plant3Energy: plant3Avg,
        totalEnergy: plant1Avg + plant2Avg + plant3Avg,
      },
      ...prev.slice(0, 19),
    ]);
  };

  // ============================================
  // EFFECT 1: Chart Animation (Sliding Window)
  // ============================================
  useEffect(() => {
    const initialData = FIXED_24H_DATA.slice(0, VISIBLE_HOURS);
    setChartData(initialData);
    logChartData(initialData);

    let dataIndex = VISIBLE_HOURS;

    const intervalId = setInterval(() => {
      const nextDataPoint = FIXED_24H_DATA[dataIndex % 24];

      setChartData((prevData) => {
        const updated = [...prevData, nextDataPoint];
        if (updated.length > VISIBLE_HOURS) {
          updated.shift();
        }
        return updated;
      });

      dataIndex++;
    }, CHART_UPDATE_INTERVAL);

    return () => clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ============================================
  // EFFECT 2: Log Chart Data (on chartData change)
  // ============================================
  useEffect(() => {
    if (chartData.length === 0) return;
    logChartData(chartData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chartData]);

  // ============================================
  // EFFECT 3: Power Fluctuation (±2% from chart avg)
  // ============================================
  useEffect(() => {
    const interval = setInterval(() => {
      if (chartData.length === 0) return;

      const { plant1Avg, plant2Avg, plant3Avg } = getChartAverages(chartData);

      setPlants((prev) =>
        prev.map((plant, index) => {
          if (plant.status !== "running") return plant;

          let chartAvg = plant1Avg;
          if (index === 1) chartAvg = plant2Avg;
          if (index === 2) chartAvg = plant3Avg;

          // Power: ±2% from chart average
          const powerVariation = 0.98 + Math.random() * 0.04;
          const newPower = chartAvg * powerVariation;

          // Voltage: ±1.5V from base
          const voltageVariation = (Math.random() - 0.5) * 3;
          const newVoltage = plant.baseVoltage + voltageVariation;

          // Current: calculated (3-phase formula)
          const newCurrent =
            (newPower * 1000) / (newVoltage * plant.powerFactor * Math.sqrt(3));

          return {
            ...plant,
            power: newPower,
            voltage: newVoltage,
            current: newCurrent,
          };
        })
      );
    }, 2000);

    return () => clearInterval(interval);
  }, [chartData]);

  // ============================================
  // EFFECT 4: Energy Accumulation
  // ============================================
  useEffect(() => {
    const interval = setInterval(() => {
      setPlants((prev) =>
        prev.map((plant) => {
          if (plant.status !== "running") return plant;

          const energyIncrement = plant.power / 3600;
          const newEnergy = plant.energyToday + energyIncrement;
          const newCost = newEnergy * ELECTRICITY_RATE;
          const newCarbon = (newEnergy * CARBON_FACTOR) / 1000;

          return {
            ...plant,
            energyToday: newEnergy,
            costToday: newCost,
            carbonToday: newCarbon,
          };
        })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // ============================================
  // EFFECT 5: Peak Power Tracking
  // ============================================
  useEffect(() => {
    if (totalPower > peakPower) {
      setPeakPower(totalPower);
    }
  }, [totalPower, peakPower]);

  // ============================================
  // RENDER
  // ============================================
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="pt-24 pb-12 px-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header */}
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
                Live demonstration with realistic industrial data pattern. Chart
                slides every 3 seconds showing 24-hour cycle.
              </AlertDescription>
            </Alert>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
                <p className="text-xs text-slate-500 mt-1">
                  Today&apos;s maximum
                </p>
              </CardContent>
            </Card>

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

          {/* Plant Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {plants.map((plant) => {
              const pfStatus = getPowerFactorStatus(plant.powerFactor);
              const effStatus = getEfficiencyStatus(plant.efficiency);

              return (
                <Card key={plant.id} className="relative overflow-hidden">
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
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-slate-50 p-3 rounded-lg">
                        <p className="text-xs text-slate-600 mb-1">Power</p>
                        <p className="text-lg font-bold text-slate-900">
                          {formatNumber(plant.power)} kW
                        </p>
                      </div>

                      <div className="bg-slate-50 p-3 rounded-lg">
                        <p className="text-xs text-slate-600 mb-1">Voltage</p>
                        <p className="text-lg font-bold text-slate-900">
                          {formatNumber(plant.voltage, 1)} V
                        </p>
                      </div>

                      <div className="bg-slate-50 p-3 rounded-lg">
                        <p className="text-xs text-slate-600 mb-1">Current</p>
                        <p className="text-lg font-bold text-slate-900">
                          {formatNumber(plant.current, 1)} A
                        </p>
                      </div>

                      <div className="bg-slate-50 p-3 rounded-lg">
                        <p className="text-xs text-slate-600 mb-1">
                          Power Factor
                        </p>
                        <p className={`text-lg font-bold ${pfStatus.color}`}>
                          {plant.powerFactor.toFixed(2)}
                        </p>
                      </div>
                    </div>

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

          {/* Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Power Consumption Comparison</CardTitle>
              <CardDescription>
                24-hour cycle with realistic industrial shift pattern
              </CardDescription>
            </CardHeader>
            <CardContent>
              <PowerChart data={chartData} />
            </CardContent>
          </Card>

          {/* Data Log */}
          <Card>
            <CardHeader>
              <CardTitle>Energy Data Log</CardTitle>
              <CardDescription>
                Average power from current 10-hour window (updates every 3
                seconds)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border max-h-[400px] overflow-y-auto">
                <Table>
                  <TableHeader className="sticky top-0 bg-white z-10">
                    <TableRow>
                      <TableHead className="w-[180px]">Timestamp</TableHead>
                      <TableHead className="text-right">
                        Plant 1 Avg (kW)
                      </TableHead>
                      <TableHead className="text-right">
                        Plant 2 Avg (kW)
                      </TableHead>
                      <TableHead className="text-right">
                        Plant 3 Avg (kW)
                      </TableHead>
                      <TableHead className="text-right">
                        Total Avg (kW)
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {dataLogs.length === 0 ? (
                      <TableRow>
                        <TableCell
                          colSpan={5}
                          className="text-center text-slate-500 py-8"
                        >
                          Collecting data...
                        </TableCell>
                      </TableRow>
                    ) : (
                      dataLogs.map((log) => (
                        <TableRow key={log.id}>
                          <TableCell className="font-mono text-xs">
                            {log.timestamp}
                          </TableCell>
                          <TableCell className="text-right font-medium">
                            {formatNumber(log.plant1Energy, 1)}
                          </TableCell>
                          <TableCell className="text-right font-medium">
                            {formatNumber(log.plant2Energy, 1)}
                          </TableCell>
                          <TableCell className="text-right font-medium">
                            {formatNumber(log.plant3Energy, 1)}
                          </TableCell>
                          <TableCell className="text-right font-bold">
                            {formatNumber(log.totalEnergy, 1)}
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

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-blue-900 to-blue-950 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-grid-white/[0.2] bg-[size:20px_20px]" />
        </div>

        <div className="relative px-6 py-16 sm:px-12 sm:py-20 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 leading-tight text-white">
            Need a Custom Energy Monitoring Solution?
          </h2>
          <p className="text-xl text-blue-100 mb-10 leading-relaxed max-w-3xl mx-auto">
            Our experienced engineers provide tailored automation solutions for
            your specific industrial energy management requirements. Get expert
            consultation today.
          </p>

          <Link
            href="/contact"
            className="group relative inline-flex items-center justify-center px-8 py-4 bg-white text-blue-900 font-semibold rounded-lg hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 mb-10"
          >
            <Settings className="h-5 w-5 mr-2" />
            <span>Get Engineering Consultation</span>
            <ArrowRight className="h-5 w-5 ml-2 transition-transform duration-300 group-hover:translate-x-2" />
            <div className="absolute inset-0 rounded-lg overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            </div>
          </Link>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 max-w-5xl mx-auto">
            <h3 className="text-white font-semibold mb-6 text-lg">
              Direct Contact Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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

              <a
                href="https://api.whatsapp.com/send/?phone=6285210067755&text=Halo PJMOtomasi, saya membutuhkan technical support untuk energy monitoring"
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
                    Iqbal - 085210067755
                  </p>
                </div>
              </a>
            </div>

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
      </section>
    </div>
  );
}
