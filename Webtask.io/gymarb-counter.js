// Create this webtask at https://webtask.io/make, and modify the 
// string EnvironmentVariables.WebTaskUri to be equal to the link provided at webtask.io.
module.exports = function(context, callback)
{
  // Get data
  context.storage.get(function (getError, data)
  {
    // Ensure nothing is wrong with the data
    if (getError) { return callback(getError); }
    data = data || {"count": 0};
    if (!data.count)
    {
      data.count = 0;
    }

    console.log(context.body_raw);

    if (context.body_raw === "1")
    {
      // Increment the counter
      data.count++;
    }
    else if (context.body_raw === "-1")
    {
      // Reset the counter
      data.count = 1;
    }

    // Save the data
    context.storage.set(data, {force: 1}, function (setError)
    {
      if (setError) { return callback(setError); }
    });

    // Return the new value.
    // Important note: not 0-based index. First player is number 1.
    callback(null, data.count);
  });
};
