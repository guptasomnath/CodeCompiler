const autocannon = require("autocannon");

async function test() {
  autocannon(
    {
      title: "AUTOCANNON_TEST",
      url: "http://localhost:3000",
      connections: 100,
      duration: 10,
      pipelining: 1,
      workers: 2,
      requests: [
        {
          method: "POST",
          path: "/compile",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            type: "javascript",
            code: `console.log('hello world');`,
          }),
        },
        {
          method: "POST",
          path: "/compile",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            type: "python",
            code: `print('This is python code');`,
          }),
        },
        {
          method: "POST",
          path: "/compile",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            type: "java",
            code: `
           class HelloWorld {
              public static void main(String[] args) {
                System.out.println("Try programiz.pro");
              }
            }
          `,
          }),
        },
      ],
    },
    console.log
  );
}

test();
