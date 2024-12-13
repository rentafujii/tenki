// 天気予報データを取得する関数
async function fetchWeather() {
  const areaCode = document.getElementById("area").value; // 選択された地域コードを取得
  const weatherInfoDiv = document.querySelector('.weatherForecast');
  const locationDiv = document.getElementById('location');
  const updateDateDiv = document.getElementById('updatedate');

  // 初期メッセージ表示
  weatherInfoDiv.innerHTML = 'データを取得中...';
  locationDiv.innerHTML = '地域コード: ' + areaCode;

  try {
      // 気象庁のAPIから天気データを取得
      const response = await fetch(`https://www.jma.go.jp/bosai/forecast/data/forecast/${areaCode}.json`);
      
      // エラーチェック
      if (!response.ok) {
          throw new Error('天気データの取得に失敗しました');
      }

      const weatherData = await response.json();

      // 最初の天気情報を取得
      const forecast = weatherData[0].timeSeries[0];
      const date = forecast.timeDefines[0]; // 日付
      const weather = forecast.parameter.weather[0] || '情報なし'; // 天気
      const tempMin = forecast.parameter.temperatureMin[0] || '情報なし'; // 最低気温
      const tempMax = forecast.parameter.temperatureMax[0] || '情報なし'; // 最高気温
      const windSpeed = forecast.parameter.windSpeed[0] || '情報なし'; // 風速

      // 表形式でデータを表示
      let tableHTML = `
          <table>
              <thead>
                  <tr>
                      <th>日付</th>
                      <th>天気</th>
                      <th>最低気温</th>
                      <th>最高気温</th>
                      <th>風速</th>
                  </tr>
              </thead>
              <tbody>
                  <tr>
                      <td>${date}</td>
                      <td>${weather}</td>
                      <td>${tempMin}°C</td>
                      <td>${tempMax}°C</td>
                      <td>${windSpeed} m/s</td>
                  </tr>
              </tbody>
          </table>
      `;

      weatherInfoDiv.innerHTML = tableHTML;
      locationDiv.innerHTML = `地域: ${areaCode}`;
      updateDateDiv.innerHTML = `最終更新日時: ${weatherData[0].reportDatetime}`;

  } catch (error) {
      weatherInfoDiv.innerHTML = `<p class="error">エラー: ${error.message}</p>`;
  }
}

// 初期ロード時にデータを取得
document.addEventListener('DOMContentLoaded', fetchWeather);

// 地域選択が変更された際に天気を再取得
document.getElementById('area').addEventListener('change', fetchWeather);
