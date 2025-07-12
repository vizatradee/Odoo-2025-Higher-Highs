// components/SkillInput.jsx
import { useState } from 'react';
import { X } from 'lucide-react';

const SkillInput = ({ label, skills, setSkills }) => {
  const [inputValue, setInputValue] = useState('');

  const handleAddSkill = (e) => {
    if (e.key === 'Enter' && inputValue.trim() !== '') {
      e.preventDefault();
      const newSkill = inputValue.trim();
      if (!skills.includes(newSkill)) {
        setSkills([...skills, newSkill]);
      }
      setInputValue('');
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove));
  };

  return (
    <div className="mb-4">
      <label className="block text-gray-300 text-sm font-bold mb-2">{label}</label>
      <div className="skill-tag-input">
        {skills.map((skill, index) => (
          <span key={index} className="skill-tag">
            {skill}
            <X size={14} className="skill-tag-remove" onClick={() => handleRemoveSkill(skill)} />
          </span>
        ))}
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleAddSkill}
          placeholder="Type skill and press Enter"
          className="flex-grow bg-transparent border-none focus:ring-0 focus:outline-none text-gray-100 placeholder-gray-400"
        />
      </div>
    </div>
  );
};

export default SkillInput;