
import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface MultiSelectInputProps {
  label: string;
  options: string[];
  selected: string[];
  onChange: (selected: string[]) => void;
  allowCustom?: boolean;
}

const MultiSelectInput = ({ label, options, selected, onChange, allowCustom = false }: MultiSelectInputProps) => {
  const [customInput, setCustomInput] = useState('');
  const [selectedOption, setSelectedOption] = useState('');

  const addSelected = (value: string) => {
    if (value && !selected.includes(value)) {
      onChange([...selected, value]);
    }
  };

  const removeSelected = (value: string) => {
    onChange(selected.filter(item => item !== value));
  };

  const addCustom = () => {
    if (customInput.trim()) {
      addSelected(customInput.trim());
      setCustomInput('');
    }
  };

  const addFromDropdown = () => {
    if (selectedOption) {
      addSelected(selectedOption);
      setSelectedOption('');
    }
  };

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      
      <div className="flex gap-2">
        {options.length > 0 && (
          <>
            <Select value={selectedOption} onValueChange={setSelectedOption}>
              <SelectTrigger className="flex-1">
                <SelectValue placeholder={`Select ${label.toLowerCase()}`} />
              </SelectTrigger>
              <SelectContent>
                {options.map((option) => (
                  <SelectItem key={option} value={option}>{option}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button type="button" onClick={addFromDropdown} disabled={!selectedOption}>
              Add
            </Button>
          </>
        )}
        
        {allowCustom && (
          <>
            <Input
              placeholder={`Add custom ${label.toLowerCase().slice(0, -1)}`}
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addCustom())}
              className="flex-1"
            />
            <Button type="button" onClick={addCustom} disabled={!customInput.trim()}>
              Add
            </Button>
          </>
        )}
      </div>

      {selected.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {selected.map((item) => (
            <div key={item} className="bg-secondary px-2 py-1 rounded-md text-sm flex items-center gap-1">
              {item}
              <button
                type="button"
                onClick={() => removeSelected(item)}
                className="text-muted-foreground hover:text-foreground ml-1"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MultiSelectInput;
