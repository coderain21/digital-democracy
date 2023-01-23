// module.exports = {
//     moduleFileExtensions: ['js', 'jsx'],
//     moduleDirectories: ['node_modules'],
  
//     moduleNameMapper:{
//                "\\.(css|less|sass|scss)$": "<rootDir>/__mocks__/styleMock.js",
//                "\\.(gif|ttf|eot|svg|png|jpg)$": "<rootDir>/__mocks__/fileMock.js"
//           },

//           resolver: undefined,
//           testEnvironment: "jsdom",
          
//   };

module.exports = {
    // preset: 'ts-jest',
    transform: {
    //   '^.+\\.(ts|tsx)?$': 'ts-jest',
      "^.+\\.(js|jsx)$": "babel-jest",
    },
    moduleNameMapper:{
               "\\.(css|less|sass|scss)$": "<rootDir>/__mocks__/styleMock.js",
               "\\.(gif|ttf|eot|svg|png|jpg)$": "<rootDir>/__mocks__/fileMock.js"
          },
          "moduleDirectories": [
            "node_modules",
            "src"
        ],
          moduleFileExtensions: ['js', 'jsx', 'ts'],
  };
