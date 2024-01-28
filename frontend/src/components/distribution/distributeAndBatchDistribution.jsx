import React, { useState } from 'react';

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
    <div className='flex flex-col justify-evenly w-[1000px] h-[750px] items-center bg-white backdrop-filter rounded-xl mt-4 backdrop-blur-lg bg-opacity-80 border-b-2 border-black'>
      <h1 className='font-contax text-4xl'>Distribute and Batch Distribution</h1>

      {/* Single Distribution */}
      <div className='flex flex-col justify-between items-center mt-4'>
        <h2 className='font-contax text-2xl'>Distribute Tokens</h2>
        <input
          type="text"
          className='border border-black rounded-[10px] w-[240px] h-[40px] mt-2'
          value={receiverAddress}
          onChange={(e) => setReceiverAddress(e.target.value)}
          placeholder="Receiver Address"
        />
        <button className="inline-block text-lg group mt-4" onClick={handleDistribute}>
          <span className="relative z-10 block px-5 py-3 overflow-hidden font-contax font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg group-hover:text-white">
            <span className="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50"></span>
            <span className="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-gray-900 group-hover:-rotate-180 ease"></span>
            <span className="relative">Distribute</span>
          </span>
        </button>
      </div>

      {/* Batch Distribution */}
      <div className='flex flex-col justify-between items-center mt-8'>
        <h2 className='font-contax text-2xl'>Batch Distribute Tokens</h2>
        {distributions.map((distribution, index) => (
          <div key={index} className='flex flex-row justify-between gap-8 mt-2'>
            <input
              type="text"
              className='border border-black rounded-[10px] w-[240px] h-[40px]'
              value={distribution.receiver}
              onChange={(e) => updateDistributionField(index, 'receiver', e.target.value)}
              placeholder="Receiver Address"
            />
            <input
              type="number"
              className='border border-black rounded-[10px] w-[240px] h-[40px]'
              value={distribution.amount}
              onChange={(e) => updateDistributionField(index, 'amount', e.target.value)}
              placeholder="Amount"
            />
          </div>
        ))}
        <button className="inline-block text-lg group mt-4" onClick={addDistributionField}>
          <span className="relative z-10 block px-5 py-3 overflow-hidden font-contax font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg group-hover:text-white">
            <span className="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50"></span>
            <span className="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-gray-900 group-hover:-rotate-180 ease"></span>
            <span className="relative">Add More</span>
          </span>
        </button>
        <button className="inline-block text-lg group mt-4" onClick={handleBatchDistribute}>
          <span className="relative z-10 block px-5 py-3 overflow-hidden font-contax font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg group-hover:text-white">
            <span className="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50"></span>
            <span className="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-gray-900 group-hover:-rotate-180 ease"></span>
            <span className="relative">Batch Distribute</span>
          </span>
        </button>
      </div>
    </div>
  );
};

export default DistributeAndBatchDistribution;
