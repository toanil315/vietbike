/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

"use client";

interface LocationSelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
}

/**
 * Reusable location dropdown select
 */
export function LocationSelect({
  label,
  value,
  onChange,
  options,
}: LocationSelectProps) {
  return (
    <div className="space-y-2">
      <label className="text-[10px] uppercase font-bold text-secondary tracking-wider">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-surface-container/50 border border-outline-variant/20 rounded-2xl py-4 px-5 text-on-surface font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 appearance-none cursor-pointer"
      >
        <option value="">Select location</option>
        {options.map((location) => (
          <option key={location} value={location}>
            {location}
          </option>
        ))}
      </select>
    </div>
  );
}
