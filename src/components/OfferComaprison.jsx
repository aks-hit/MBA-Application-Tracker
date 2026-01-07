export default function OfferComparison({ applications }) {
  const offers = applications.filter(a => a.finalShortlisted);

  if (!offers.length) return null;

  return (
    <div className="mt-8">
      <h2 className="font-semibold text-lg mb-3">Offer Comparison</h2>
      <table className="w-full text-sm border">
        <thead className="bg-gray-100">
          <tr>
            <th>Institute</th>
            <th>Fee</th>
            <th>Deadline</th>
            <th>Result</th>
          </tr>
        </thead>
        <tbody>
          {offers.map(o => (
            <tr key={o.id}>
              <td>{o.instituteName}</td>
              <td>₹{o.feeAmount || '-'}</td>
              <td>{o.feeDeadline}</td>
              <td>{o.result}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
