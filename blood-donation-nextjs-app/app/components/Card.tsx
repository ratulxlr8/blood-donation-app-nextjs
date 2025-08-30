"use client";
import { ChangeEvent, useState } from "react";

export default function ContactFormCard() {
  const [formData, setFormData] = useState({
    location: "",
    bloodGroup: "",
    message: "",
  });

  const [errors, setErrors] = useState({
    location: "",
    bloodGroup: "",
    message: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  type WhatsappContact = { whatsappUrl: string; name?: string; phone?: string };
  const [whatsappContacts, setWhatsappContacts] = useState<WhatsappContact[]>([]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user types
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = { location: "", bloodGroup: "", message: "" };

    // Blood Group validation
    if (!formData.bloodGroup.trim()) {
      newErrors.bloodGroup = "Blood group is required";
      valid = false;
    }

    // Location validation
    if (!formData.location.trim()) {
      newErrors.location = "Location is required";
      valid = false;
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
      valid = false;
    } else if (formData.message.length < 10) {
      newErrors.message = "Message must be at least 10 characters";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      setIsLoading(true);
      try {
        const response = await fetch(
          "https://1039-289.n8n1.deltadns.xyz/webhook/2d55f905-f182-4bdf-8b37-c16f830d9531",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );

        if (response.ok) {
          const data = await response.json();
          setWhatsappContacts(data);
        } else {
          throw new Error("Failed to submit request");
        }
      } catch (error) {
        console.error("Error submitting form:", error);
        alert("Failed to submit request. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const resetForm = () => {
    setFormData({ location: "", bloodGroup: "", message: "" });
    setWhatsappContacts([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50 to-slate-100 flex items-center justify-center p-4">
      {/* Main Card Container */}
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 overflow-hidden w-full max-w-lg transform hover:scale-[1.02] transition-all duration-300">
        {/* Header Section */}
        <div className="relative bg-gradient-to-r from-slate-800 via-slate-900 to-orange-900 p-8">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative z-10">
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-3 h-3 bg-orange-500 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse delay-75"></div>
              <div className="w-1 h-1 bg-orange-300 rounded-full animate-pulse delay-150"></div>
            </div>
            <h1 className="text-white text-xl font-bold tracking-wide">
              BLOOD DONATION REQUEST
            </h1>
            <p className="text-orange-200 text-sm font-medium mt-1">
              TECHNONEXT
            </p>
          </div>
        </div>

        {/* Form Section */}
        <div className="p-8">
          <div className="space-y-6">
            {/* Blood Group Field */}
            <div className="group">
              <label
                htmlFor="bloodGroup"
                className="block text-sm font-semibold text-slate-800 mb-2 transition-colors group-focus-within:text-orange-600"
              >
                Required Blood Group
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg
                    className="w-5 h-5 text-slate-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </div>
                <select
                  id="bloodGroup"
                  name="bloodGroup"
                  value={formData.bloodGroup}
                  onChange={handleChange}
                  className={`block w-full pl-12 pr-4 py-4 border-2 text-slate-800 bg-white/50 backdrop-blur-sm ${
                    errors.bloodGroup
                      ? "border-red-400 focus:border-red-500"
                      : "border-slate-200 focus:border-orange-400"
                  } rounded-2xl focus:ring-4 focus:ring-orange-100 focus:outline-none transition-all duration-200 appearance-none cursor-pointer`}
                >
                  <option value="" className="text-slate-400">
                    Select blood group needed
                  </option>
                  <option value="A+">A+ (A Positive)</option>
                  <option value="A-">A- (A Negative)</option>
                  <option value="B+">B+ (B Positive)</option>
                  <option value="B-">B- (B Negative)</option>
                  <option value="AB+">AB+ (AB Positive)</option>
                  <option value="AB-">AB- (AB Negative)</option>
                  <option value="O+">O+ (O Positive)</option>
                  <option value="O-">O- (O Negative)</option>
                </select>
                {/* Custom dropdown arrow */}
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                  <svg
                    className="w-5 h-5 text-slate-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
              {errors.bloodGroup && (
                <p className="mt-2 text-sm text-red-500 flex items-center space-x-1">
                  <span className="w-4 h-4 text-red-500">⚠</span>
                  <span>{errors.bloodGroup}</span>
                </p>
              )}
              <p className="mt-1 text-xs text-slate-500">
                Select the blood group you need for donation
              </p>
            </div>

            {/* Location Field */}
            <div className="group">
              <label
                htmlFor="location"
                className="block text-sm font-semibold text-slate-800 mb-2 transition-colors group-focus-within:text-orange-600"
              >
                Location
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg
                    className="w-5 h-5 text-slate-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Enter your location"
                  className={`block w-full pl-12 pr-4 py-4 border-2 text-slate-800 bg-white/50 backdrop-blur-sm ${
                    errors.location
                      ? "border-red-400 focus:border-red-500"
                      : "border-slate-200 focus:border-orange-400"
                  } rounded-2xl focus:ring-4 focus:ring-orange-100 focus:outline-none transition-all duration-200 placeholder:text-slate-400`}
                />
              </div>
              {errors.location && (
                <p className="mt-2 text-sm text-red-500 flex items-center space-x-1">
                  <span className="w-4 h-4 text-red-500">⚠</span>
                  <span>{errors.location}</span>
                </p>
              )}
            </div>

            {/* Message Field */}
            <div className="group">
              <label
                htmlFor="message"
                className="block text-sm font-semibold text-slate-800 mb-2 transition-colors group-focus-within:text-orange-600"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                placeholder="Describe your blood donation requirements..."
                className={`block w-full p-4 border-2 text-slate-800 bg-white/50 backdrop-blur-sm ${
                  errors.message
                    ? "border-red-400 focus:border-red-500"
                    : "border-slate-200 focus:border-orange-400"
                } rounded-2xl focus:ring-4 focus:ring-orange-100 focus:outline-none transition-all duration-200 resize-none placeholder:text-slate-400`}
              ></textarea>
              {errors.message && (
                <p className="mt-2 text-sm text-red-500 flex items-center space-x-1">
                  <span className="w-4 h-4 text-red-500">⚠</span>
                  <span>{errors.message}</span>
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isLoading}
              className={`w-full ${
                isLoading
                  ? "bg-gradient-to-r from-slate-400 to-slate-500 cursor-not-allowed"
                  : "bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
              } text-white py-4 px-6 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-orange-200 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 relative overflow-hidden group`}
            >
              <span className="relative z-10 flex items-center justify-center space-x-2">
                {isLoading && (
                  <svg
                    className="animate-spin w-5 h-5 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                )}
                <span>{isLoading ? "Searching Donors..." : "Find Donors"}</span>
              </span>
              {!isLoading && (
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              )}
            </button>
          </div>

          {/* WhatsApp Contacts Section */}
          {whatsappContacts.length > 0 && (
            <div className="mt-8 p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-200">
              <div className="flex items-center space-x-2 mb-4">
                <svg
                  className="w-6 h-6 text-green-600"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.087z" />
                </svg>
                <h3 className="text-lg font-bold text-green-800">
                  Available Donors Found!
                </h3>
              </div>
              <p className="text-sm text-green-700 mb-4">
                We found {whatsappContacts.length} potential donor
                {whatsappContacts.length > 1 ? "s" : ""} for blood group{" "}
                <span className="font-semibold">{formData.bloodGroup}</span>.
                Click below to contact them directly on WhatsApp:
              </p>
              <div className="space-y-3">
                {whatsappContacts.map((contact, index) => (
                  <a
                    key={index}
                    href={contact.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between w-full p-4 bg-white border border-green-200 rounded-xl hover:bg-green-50 hover:border-green-300 transition-all duration-200 transform hover:scale-[1.02] group"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                        <svg
                          className="w-6 h-6 text-white"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.087z" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-semibold text-green-800">
                          Donor #{index + 1}
                        </p>
                        <p className="text-sm text-green-600">
                          Click to contact via WhatsApp
                        </p>
                      </div>
                    </div>
                    <svg
                      className="w-5 h-5 text-green-500 group-hover:translate-x-1 transition-transform duration-200"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </a>
                ))}
              </div>
              <button
                onClick={resetForm}
                className="w-full mt-4 bg-slate-100 hover:bg-slate-200 text-slate-700 py-3 px-4 rounded-xl font-medium transition-all duration-200 border border-slate-200"
              >
                Submit New Request
              </button>
            </div>
          )}
        </div>

        {/* Footer Section */}
        <div className="bg-gradient-to-r from-slate-50 to-orange-50 border-t border-slate-100 px-8 py-6 text-center">
          <div className="flex items-center justify-center space-x-2 text-slate-600">
            <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
            <p className="text-sm font-medium">{`We'll respond within 24 hours`}</p>
            <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
          </div>
          <p className="text-xs text-slate-500 mt-2">
            Powered by{" "}
            <span className="font-semibold text-orange-600">Technonext</span>
          </p>
        </div>
      </div>
    </div>
  );
}
