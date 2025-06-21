import { Palette } from "lucide-react";
import { themes } from "../constants";
import { useThemeStore } from "../store/useThemeStore";

const ThemeSelector = () => {
  const { theme, setTheme } = useThemeStore();

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
  };

  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
        <Palette size={24} />
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content z-[1] p-2 shadow-2xl bg-base-100 rounded-box w-52 overflow-y-auto max-h-96"
      >
        {themes.map((t) => (
          <li key={t.name}>
            <button
              className={`btn btn-sm btn-block justify-start mb-1 ${
                theme === t.name ? "btn-primary" : ""
              }`}
              onClick={() => handleThemeChange(t.name)}
            >
              <span
                className="inline-block size-4 rounded-full mr-2"
                style={{ backgroundColor: t.color }}
              ></span>
              {t.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ThemeSelector;
