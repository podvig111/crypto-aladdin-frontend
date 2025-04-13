
import { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function CryptoSignalDashboard() {
  const [signals, setSignals] = useState([]);

  useEffect(() => {
    fetch("https://your-api-url.onrender.com/signals")
      .then((res) => res.json())
      .then((data) => setSignals(data));
  }, []);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">📈 Крипто сигналы</h1>
      {signals.map((signal, index) => (
        <div key={index} className="border rounded-2xl p-4 shadow">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold">{signal.pair}</h2>
              <p className="text-sm text-gray-500">{signal.strategy}</p>
            </div>
            <span className={`text-lg font-bold ${signal.action === "buy" ? "text-green-500" : "text-red-500"}`}>
              {signal.action.toUpperCase()}
            </span>
          </div>
          <div className="mt-4 h-40">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={signal.chart}>
                <XAxis dataKey="time" hide />
                <YAxis domain={["auto", "auto"]} hide />
                <Tooltip />
                <Line type="monotone" dataKey="price" stroke="#8884d8" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      ))}
    </div>
  );
}
