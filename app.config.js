export default {
    expo: {
        plugins: [
            [
                'expo-build-properties',
                {
                    android: {
                        compileSdkVersion: 33,
                        targetSdkVersion: 33,
                        buildToolsVersion: '33.0.0',
                    },
                    ios: {
                        deploymentTarget: '13.0',
                    },
                },
            ],
        ],
    },
};
