onmessage = function(e) {
    const { data, interval } = e.data;
  
    function aggregateData(data, interval) {
        let aggregated = [];
        let currentTime = new Date(data[0].updatedAt).getTime(); // Assuming the data is sorted
        let currentGroup = [];
      
        for (let entry of data) {
          let entryTime = new Date(entry.updatedAt).getTime();
          
          // If the entry is within the current interval
          if (entryTime - currentTime < interval) {
            currentGroup.push(entry);
          } else {
            // Process the current group
            if (currentGroup.length > 0) {
              let open = currentGroup[0].price;
              let close = currentGroup[currentGroup.length - 1].price;
              let high = Math.max(...currentGroup.map(e => e.price));
              let low = Math.min(...currentGroup.map(e => e.price));
      
              aggregated.push({
                updatedAt: new Date(currentTime).toISOString(),
                open,
                close,
                high,
                low
              });
            }
      
            // Reset for next interval
            while (entryTime - currentTime >= interval) {
              currentTime += interval;
            }
            currentGroup = [entry];
          }
        }
      
        // Handle any remaining data
        if (currentGroup.length > 0) {
          let open = currentGroup[0].price;
          let close = currentGroup[currentGroup.length - 1].price;
          let high = Math.max(...currentGroup.map(e => e.price));
          let low = Math.min(...currentGroup.map(e => e.price));
      
          aggregated.push({
            updatedAt: new Date(currentTime).toISOString(),
            open,
            close,
            high,
            low
          });
        }
      
        return aggregated;
      }
      
    const aggregatedData = aggregateData(data, interval);
    postMessage(aggregatedData);
  };
  