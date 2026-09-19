import React, { useState } from "react";
import { useFarm } from "../context/FarmContext";
import { Upload, Camera, Stethoscope, Sparkles, AlertCircle, CheckCircle, ShieldAlert, FileText, Activity, BookmarkPlus } from "lucide-react";
import SampleLeafSelector from "../components/SampleLeafSelector";

export default function CropDoctor() {
  const { t, fields, addDiagnosisToField } = useFarm();
  const [selectedImage, setSelectedImage] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const [activeTab, setActiveTab] = useState("diagnosis");
  const [selectedTargetField, setSelectedTargetField] = useState(fields[0]?.id || "field-a");
  const [saveSuccessMsg, setSaveSuccessMsg] = useState("");

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
        triggerAnalysis(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSelectSample = (sample) => {
    setSelectedImage(sample.imageSvg);
    triggerAnalysis(sample.imageSvg, sample);
  };

  const triggerAnalysis = async (base64Img, sampleMeta = null) => {
    setIsScanning(true);
    setScanResult(null);
    setSaveSuccessMsg("");

    try {
      const response = await fetch("/api/analyze-crop", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: base64Img })
      });

      if (response.ok) {
        const result = await response.json();
        setScanResult(result);
      } else {
        throw new Error("Diagnosis request failed");
      }
    } catch (err) {
      // Deterministic Demo Fallback with Clear Labeling
      setScanResult({
        isCrop: true,
        analysisMode: "Demo Analysis",
        isDemo: true,
        data: {
          cropType: sampleMeta?.crop || "Tomato (Arka Rakshak)",
          diseaseName: sampleMeta?.condition || "Early Blight (Alternaria solani)",
          confidence: 94,
          severity: sampleMeta?.severity || "High",
          affectedArea: 26,
          spreadRisk: "High",
          urgency: "Treat within 24–48 hours",
          symptoms: [
            "Concentric target-board dark brown lesions on mature foliage",
            "Chlorotic yellow halos surrounding affected leaf tissue",
            "Basal leaf defoliation starting from ground level upward"
          ],
          treatment: {
            organic: [
              "Spray bio-fungicide Bacillus subtilis or Copper octanoate formulation",
              "Prune infected lower leaves 15cm above soil level and dispose safely"
            ],
            chemical: [
              "Apply protective fungicide spray (e.g., Mancozeb or Chlorothalonil)",
              "Alternate with systemic azoxystrobin spray if disease pressure persists"
            ],
            safetyAdvisory: "Verify exact chemical dosage and application rates against registered product labels or consult local agricultural extension officers before application."
          },
          prevention: [
            "Avoid overhead sprinkler irrigation to keep leaf wetness duration low",
            "Apply straw mulch around root base to prevent soil spore splash",
            "Maintain 3-foot inter-row spacing for rapid canopy ventilation"
          ],
          explanation: "Observed characteristic concentric ring brown lesions with chlorotic yellow margins on tomato foliage. High relative humidity accelerates spore tube elongation."
        }
      });
    } finally {
      setIsScanning(false);
    }
  };

  const handleSaveToField = () => {
    if (scanResult && scanResult.data) {
      addDiagnosisToField(selectedTargetField, scanResult.data);
      const targetFieldObj = fields.find(f => f.id === selectedTargetField);
      setSaveSuccessMsg(`Diagnosis saved to ${targetFieldObj?.name || "field"} history & Action Center updated!`);
    }
  };

  return (
    <div className="space-y-6 pb-12 animate-fadeIn">
      
      {/* Title Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-teal-950/40 p-6 rounded-3xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-outfit flex items-center gap-3">
            <Stethoscope className="w-7 h-7 text-emerald-400" />
            <span>{t.cropDoctor.title}</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            {t.cropDoctor.subtitle}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Image Uploader & Samples */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-3">Crop Image Scanner</span>
            
            {/* Upload Area */}
            <label className="border-2 border-dashed border-slate-700 hover:border-emerald-500/50 rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer transition-colors bg-slate-950/50 min-h-[220px] relative overflow-hidden group">
              {selectedImage ? (
                <img src={selectedImage} alt="Crop Scan" className="max-h-52 rounded-xl object-contain" />
              ) : (
                <div className="text-center space-y-2">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto group-hover:scale-110 transition-transform">
                    <Upload className="w-6 h-6" />
                  </div>
                  <p className="text-xs font-semibold text-slate-300">{t.cropDoctor.uploadPrompt}</p>
                  <p className="text-[11px] text-slate-500">Supports JPG, PNG, WEBP formats</p>
                </div>
              )}
              <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
            </label>

            {/* Quick Test Samples */}
            <SampleLeafSelector onSelectSample={handleSelectSample} />
          </div>
        </div>

        {/* Right Column: Scan Loading & Diagnostic Output */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* Scanning Animation State */}
          {isScanning && (
            <div className="p-12 rounded-3xl bg-slate-900/80 border border-slate-800 text-center space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mx-auto animate-spin">
                <Sparkles className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-bold text-white font-outfit">{t.cropDoctor.analyzing}</h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">Connecting image features with weather metrics & epidemiological history...</p>
            </div>
          )}

          {/* Results State */}
          {!isScanning && scanResult && scanResult.data && (
            <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-5">
              
              {/* Mandatory Transparency Badge (Correction 2) */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{t.cropDoctor.diagnosisResult}</span>
                  <h2 className="text-2xl font-extrabold text-white font-outfit">{scanResult.data.diseaseName}</h2>
                </div>

                {/* Analysis Mode Badge */}
                <div className="flex flex-col items-end">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
                    scanResult.isDemo
                      ? "bg-amber-500/15 text-amber-400 border-amber-500/30"
                      : "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
                  }`}>
                    {scanResult.analysisMode || "Demo Analysis"}
                  </span>
                  <span className="text-[10px] text-slate-500 mt-1">Confidence: {scanResult.data.confidence}%</span>
                </div>
              </div>

              {/* Metrics Pills */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                  <span className="text-slate-400 block font-semibold">{t.cropDoctor.cropType}</span>
                  <span className="text-white font-bold">{scanResult.data.cropType}</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                  <span className="text-slate-400 block font-semibold">{t.cropDoctor.severity}</span>
                  <span className={`font-bold ${scanResult.data.severity === "High" ? "text-rose-400" : "text-amber-400"}`}>
                    {scanResult.data.severity}
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                  <span className="text-slate-400 block font-semibold">{t.cropDoctor.affectedArea}</span>
                  <span className="text-slate-200 font-bold">{scanResult.data.affectedArea}% Surface</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                  <span className="text-slate-400 block font-semibold">{t.cropDoctor.urgency}</span>
                  <span className="text-rose-300 font-bold">{scanResult.data.urgency}</span>
                </div>
              </div>

              {/* Tabs */}
              <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
                {[
                  { id: "diagnosis", label: t.cropDoctor.tabDiagnosis },
                  { id: "treatment", label: t.cropDoctor.tabTreatment },
                  { id: "prevention", label: t.cropDoctor.tabPrevention },
                  { id: "reasoning", label: t.cropDoctor.tabExplanation }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`text-xs px-3 py-1.5 rounded-lg font-semibold transition-all ${
                      activeTab === tab.id
                        ? "bg-emerald-500 text-slate-950 font-bold shadow"
                        : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="min-h-[140px] text-xs space-y-3">
                
                {activeTab === "diagnosis" && (
                  <div>
                    <h4 className="font-bold text-slate-200 mb-2">Identified Visual Symptoms:</h4>
                    <ul className="space-y-1.5 list-disc list-inside text-slate-300">
                      {scanResult.data.symptoms?.map((sym, i) => <li key={i}>{sym}</li>)}
                    </ul>
                  </div>
                )}

                {activeTab === "treatment" && (
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-bold text-emerald-400 mb-1">{t.cropDoctor.organicTreatment}</h4>
                      <ul className="space-y-1 list-disc list-inside text-slate-300">
                        {scanResult.data.treatment?.organic?.map((tr, i) => <li key={i}>{tr}</li>)}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-bold text-cyan-400 mb-1">{t.cropDoctor.chemicalTreatment}</h4>
                      <ul className="space-y-1 list-disc list-inside text-slate-300">
                        {scanResult.data.treatment?.chemical?.map((tr, i) => <li key={i}>{tr}</li>)}
                      </ul>
                    </div>

                    {/* Mandatory Chemical Safety Advisory (Correction 3) */}
                    <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-[11px] leading-relaxed">
                      <span className="font-bold block mb-0.5">Chemical Application Safety Advisory:</span>
                      {scanResult.data.treatment?.safetyAdvisory || "Verify exact chemical dosage and application rates against registered product labels or consult local agricultural extension officers before application."}
                    </div>
                  </div>
                )}

                {activeTab === "prevention" && (
                  <div>
                    <h4 className="font-bold text-slate-200 mb-2">Long-term Field Prevention Protocol:</h4>
                    <ul className="space-y-1.5 list-disc list-inside text-slate-300">
                      {scanResult.data.prevention?.map((prev, i) => <li key={i}>{prev}</li>)}
                    </ul>
                  </div>
                )}

                {activeTab === "reasoning" && (
                  <div>
                    <h4 className="font-bold text-slate-200 mb-2">Why AgriShield Thinks This:</h4>
                    <p className="text-slate-300 leading-relaxed">{scanResult.data.explanation}</p>
                  </div>
                )}

              </div>

              {/* Save Diagnosis to Field Action */}
              <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-slate-400">Target Field:</span>
                  <select
                    value={selectedTargetField}
                    onChange={(e) => setSelectedTargetField(e.target.value)}
                    className="bg-slate-950 border border-slate-700 text-white font-semibold rounded-lg px-2.5 py-1 text-xs"
                  >
                    {fields.map(f => (
                      <option key={f.id} value={f.id}>{f.name} ({f.crop})</option>
                    ))}
                  </select>
                </div>

                <button
                  onClick={handleSaveToField}
                  className="w-full sm:w-auto px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-colors"
                >
                  <BookmarkPlus className="w-4 h-4" />
                  <span>{t.cropDoctor.saveToHistory}</span>
                </button>
              </div>

              {saveSuccessMsg && (
                <div className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-semibold text-center">
                  {saveSuccessMsg}
                </div>
              )}

            </div>
          )}

          {!isScanning && !scanResult && (
            <div className="p-12 rounded-3xl bg-slate-900/60 border border-slate-800 text-center space-y-3">
              <Stethoscope className="w-10 h-10 text-slate-600 mx-auto" />
              <h3 className="text-base font-bold text-slate-300">Ready for Image Diagnosis</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">Upload a leaf photo or click one of the sample test photos on the left to view immediate multi-modal diagnosis.</p>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
