import React from "react";
import { useState } from "react";

const DistributeAndBatchDistribution = ({ contractBundle }) => {
  const [receiverAddress, setReceiverAddress] = useState('');
  const [distributions, setDistributions] = useState([{ receiver: '', amount: '' }]);

  const handleDistribute = async () => {
    try {
      const tx = await contractBundle.crowdFundContract.distribute(receiverAddress);
      await tx.wait();
      console.log("Distribution successful.");
    } catch (error) {
      console.error("Error in distribution:", error);
    }
  };

  const handleBatchDistribute = async () => {
    try {
      const formattedDistributions = distributions.map(d => ({
        receiver: d.receiver,
        amount: d.amount
      }));
      const tx = await contractBundle.crowdFundContract.batchDistribute(formattedDistributions);
      await tx.wait();
      console.log("Batch distribution successful.");
    } catch (error) {
      console.error("Error in batch distribution:", error);
    }
  };

  const addDistributionField = () => {
    setDistributions([...distributions, { receiver: '', amount: '' }]);
  };

  const updateDistributionField = (index, field, value) => {
    const newDistributions = [...distributions];
    newDistributions[index][field] = value;
    setDistributions(newDistributions);
  };

  return (
    <div>
      {/* Single Distribution */}
      <div>
        <h2>Distribute Tokens</h2>
        <input
          type="text"
          value={receiverAddress}
          onChange={(e) => setReceiverAddress(e.target.value)}
          placeholder="Receiver Address"
        />
        <button onClick={handleDistribute}>Distribute</button>
      </div>

      {/* Batch Distribution */}
      <div>
        <h2>Batch Distribute Tokens</h2>
        {distributions.map((distribution, index) => (
          <div key={index}>
            <input
              type="text"
              value={distribution.receiver}
              onChange={(e) => updateDistributionField(index, 'receiver', e.target.value)}
              placeholder="Receiver Address"
            />
            <input
              type="number"
              value={distribution.amount}
              onChange={(e) => updateDistributionField(index, 'amount', e.target.value)}
              placeholder="Amount"
            />
          </div>
        ))}
        <button onClick={addDistributionField}>Add More</button>
        <button onClick={handleBatchDistribute}>Batch Distribute</button>
      </div>
    </div>
  );
};

export default DistributeAndBatchDistribution;
