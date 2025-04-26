interface ResponseDisplayProps {
  response: { response: any; original_question: string };
}

export default function ResponseDisplay({ response }: ResponseDisplayProps) {
  const { visa_requirements, passport_requirements, additional_documents, travel_advisories } = response.response;

  return (
    <div className="card">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Travel Information</h2>
      <div className="space-y-4">
        <div>
          <p className="text-lg font-medium text-primary">Your Question</p>
          <p className="text-gray-600">{response.original_question}</p>
        </div>
        <div>
          <p className="text-lg font-medium text-primary">Visa Requirements</p>
          <p className="text-gray-600">{visa_requirements}</p>
        </div>
        <div>
          <p className="text-lg font-medium text-primary">Passport Requirements</p>
          <p className="text-gray-600">{passport_requirements}</p>
        </div>
        <div>
          <p className="text-lg font-medium text-primary">Additional Documents</p>
          <p className="text-gray-600">{additional_documents}</p>
        </div>
        <div>
          <p className="text-lg font-medium text-primary">Travel Advisories</p>
          <p className="text-gray-600">{travel_advisories}</p>
        </div>
      </div>
    </div>
  );
}