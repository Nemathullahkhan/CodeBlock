interface StrengthProps {
    passStrength?: number;
    passwordLength?: string;
  }
  
  const PasswordStrength = ({ passStrength, passwordLength }: StrengthProps) => {
    // Ensure `passwordLength` is defined and has a value before proceeding
    const isValidPassword = passwordLength && passwordLength.length > 0;
  
    // Define strength labels & colors
    const strengthLabels = ["Very Weak", "Weak", "Medium", "Strong", "Very Strong"];
    const strengthColors = ["bg-red-500", "bg-orange-500", "bg-yellow-500", "bg-green-600", "bg-green-800"];
  
    return (
      <div className="mt-2 w-full">
        {/* Strength Label */}
        {isValidPassword && passStrength !== undefined && passStrength < strengthLabels.length && (
         <p className={`text-xs text-transparent ml-2  bg-clip-text ${strengthColors[passStrength]}`}>
         {strengthLabels[passStrength]}
       </p>
       
        )}
  
        {/* Strength Bar */}
        {isValidPassword && passStrength !== undefined && passStrength < strengthColors.length && (
          <div className="flex mt-1 space-x-1 w-full">
            {[...Array(passStrength + 1)].map((_, i) => (
              <div key={i} className={`w-full h-1 ${strengthColors[passStrength]} rounded-sm`}></div>
            ))}
          </div>
        )}
      </div>
    );
  };
  
  export default PasswordStrength;
  