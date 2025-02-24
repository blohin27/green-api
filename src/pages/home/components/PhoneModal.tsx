import React, { useState } from "react";

interface PhoneModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (phoneNumber: string) => void;
}

export const PhoneModal: React.FC<PhoneModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [phoneNumber, setPhoneNumber] = useState<string>("");

  const handleSubmit = () => {
    if (phoneNumber.trim()) {
      onSubmit(phoneNumber);
      setPhoneNumber("");
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md transform transition-all duration-300">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Введите номер телефона
        </h2>
        <input
          type="tel"
          placeholder="Например: 79001234567"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 mb-4"
        />
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-gray-300 text-gray-800 hover:bg-gray-400 transition"
          >
            Отмена
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600 transition"
          >
            Сохранить
          </button>
        </div>
      </div>
    </div>
  );
};
