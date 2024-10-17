
const generatePDF = async () => {
    // Create the HTML content with inline styles to mimic the React Native UI
    let htmlContent = `
            <html>
                <head>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            padding: 10px;
                        }
                        .header {
                            background-color: #4CAF50;
                            color: white;
                            text-align: center;
                            padding: 10px;
                        }
                        .detailsContainer {
                            margin-top: 20px;
                        }
                        .detailText {
                            font-size: 16px;
                            margin-bottom: 10px;
                        }
                        .guestContainer {
                            border: 1px solid #ccc;
                            padding: 10px;
                            margin-top: 10px;
                        }
                        .guestHeader {
                            font-weight: bold;
                            margin-bottom: 10px;
                        }
                        .guestContent {
                            display: flex;
                            justify-content: space-between;
                        }
                        .text2 {
                            font-size: 14px;
                            margin-bottom: 5px;
                        }
                        .image {
                            width: 100px;
                            height: 100px;
                        }
                        .downloadButton {
                            background-color: #4CAF50;
                            color: white;
                            text-align: center;
                            padding: 10px;
                            margin-top: 20px;
                        }
                    </style>
                </head>
                <body>
                    <div class="header">
                        <h1>पेंडिंग रिपोर्ट डिटेल</h1>
                    </div>
                    <div class="detailsContainer">
                        <p class="detailText">होटल का नाम: ${commonData.HotelName}</p>
                        <p class="detailText">चेक इन तारीख: ${SubmitDate}</p>
                        <p class="detailText">कुल अतिथि: ${guestData.length} (${maleCount} पुरुष, ${femaleCount} महिला)</p>
                    </div>
                    ${guestData.map((item, index) => `
                        <div class="guestContainer">
                            <div class="guestHeader">अतिथि क्र. ${index + 1}</div>
                            <div class="guestContent">
                                <div>
                                    <img class="image" src="data:image/jpeg;base64,${item.Image1}" alt="Guest-Image-1" />
                                    <p class="text2">नाम: ${item.GuestName} ${item.GuestLastName}</p>
                                    <p class="text2">जेंडर: ${item.gender}</p>
                                    <p class="text2">मोबाइल नंबर: ${item.ContactNo}</p>
                                    <p class="text2">पता: ${item.Address}</p>
                                </div>
                                <div>
                                    <img class="image" src="data:image/jpeg;base64,${item.Image2}" alt="Guest-Image-2" />
                                    <p class="text2">यात्रा का उद्देश्य: ${item.TravelReson}</p>
                                    <p class="text2">आईडी प्रकार: ${item.IdentificationType}</p>
                                    <p class="text2">आईडी नंबर: ${item.IdentificationNo}</p>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </body>
            </html>
        `;

    let options = {
        html: htmlContent,
        fileName: 'Pending_Report',
        directory: 'Documents',  // Save in the app's Documents directory temporarily
    };

    try {
        // First generate the PDF file
        let file = await RNHTMLtoPDF.convert(options);
        console.log('File generated: ', file);

        if (file && file.filePath) {
            // Define the public Downloads path where the file will be moved
            const destPath = `${RNFS.DownloadDirectoryPath}/Pending_Report.pdf`;

            // Move the file from app-specific directory to public Downloads
            await RNFS.moveFile(file.filePath, destPath);
            console.log("PDF moved to Downloads:", destPath);

            // Notify user with a toast message
            ToastAndroid.show("PDF saved to: " + destPath, ToastAndroid.LONG);
        }
    } catch (error) {
        console.error("Error generating or moving PDF:", error);
        ToastAndroid.show("Error generating or moving PDF", ToastAndroid.LONG);
    }
};

<TouchableOpacity style={styles.downloadButton} onPress={generatePDF}>
    <Text style={styles.downloadButtonText}>Download PDF</Text>
</TouchableOpacity>