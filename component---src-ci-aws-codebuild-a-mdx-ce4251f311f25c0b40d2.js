(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{"6pev":function(e,n,t){"use strict";t.r(n),t.d(n,"_frontmatter",(function(){return i})),t.d(n,"default",(function(){return p}));var r=t("Fcif"),s=t("+I+c"),o=(t("mXGw"),t("/FXl")),a=t("TjRS"),i=(t("aD51"),{});void 0!==i&&i&&i===Object(i)&&Object.isExtensible(i)&&!i.hasOwnProperty("__filemeta")&&Object.defineProperty(i,"__filemeta",{configurable:!0,value:{name:"_frontmatter",filename:"src/ci/aws-codebuild-a.mdx"}});var l={_frontmatter:i},c=a.a;function p(e){var n=e.components,t=Object(s.a)(e,["components"]);return Object(o.b)(c,Object(r.a)({},l,t,{components:n,mdxType:"MDXLayout"}),Object(o.b)("p",null,"This tutorial is contributed by ",Object(o.b)("a",{href:"https://github.com/mlsad3",parentName:"p"},"@mlsad3"),". The original text is available at ",Object(o.b)("a",{href:"https://github.com/agoldis/sorry-cypress/issues/6",parentName:"p"},"https://github.com/agoldis/sorry-cypress/issues/6"),"."),Object(o.b)("hr",null),Object(o.b)("p",null,Object(o.b)("strong",{parentName:"p"},"This post is not about deploying sorry-cypress on AWS, but focusing on getting my Cypress to run in parallel and point to sorry-cypress's ",Object(o.b)("inlineCode",{parentName:"strong"},"director"),".")),Object(o.b)("p",null,"After my CodeBuild and CodeDeploy (site is deployed to Elastic Beanstalk), I added another 'Stage' and put all of my Cypress tests. I launch 5 in parallel."),Object(o.b)("img",{src:"https://user-images.githubusercontent.com/15711477/73124587-48404700-3f5a-11ea-9ed3-fd6f72e87ab8.png",alt:"Codebuild screenshot"}),Object(o.b)("p",null,"Here is what each of the Cypress CodeBuilds look like:"),Object(o.b)("img",{src:"https://user-images.githubusercontent.com/15711477/73125329-e506e280-3f62-11ea-811a-1bf0f57a773d.png",alt:"Codebuild screenshot"}),Object(o.b)("p",null,"Then I created a buildspec for my Cypress run. Note the following things I am doing in there:"),Object(o.b)("ul",null,Object(o.b)("li",{parentName:"ul"},Object(o.b)("p",{parentName:"li"},"In the ",Object(o.b)("inlineCode",{parentName:"p"},"install")," section, I install all the stuff I need for Cypress, and then npm install my Cypress stuff (mine is located in subdirectory ",Object(o.b)("inlineCode",{parentName:"p"},"testing/cypress"),")")),Object(o.b)("li",{parentName:"ul"},Object(o.b)("p",{parentName:"li"},"In the ",Object(o.b)("inlineCode",{parentName:"p"},"pre_build")," section, I am modifying a file in my code to make sure I am pointing to the correct development deployment url.")),Object(o.b)("li",{parentName:"ul"},Object(o.b)("p",{parentName:"li"},"In the ",Object(o.b)("inlineCode",{parentName:"p"},"build")," section, I am editing the Cypress install to point to my Cypress Director URL, and then running my Cypress tests script. This script uses a couple environment variables. It uses the ",Object(o.b)("inlineCode",{parentName:"p"},"$BUILD_TAG")," for ",Object(o.b)("inlineCode",{parentName:"p"},"ciBuildId")," and ",Object(o.b)("inlineCode",{parentName:"p"},"$CODEBUILD_BUILD_NUMBER")," for 'uniqueId' (essentially to make sure each parallel test run has a unique identifier, the ",Object(o.b)("inlineCode",{parentName:"p"},"$CODEBUILD_BUILD_NUMBER")," will be, for example, 73, 74, 75, 76, 77 for my 5 Cypress CodeBuilds)."))),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre"},'      version: 0.2\n\n      phases:\n        install:\n          runtime-versions:\n            nodejs: 10\n          commands:\n            - echo Entered the install phase...\n            - apt-get update -y\n            - apt-get install -y apt-transport-https\n            - apt-get install -y libgtk2.0-0 libnotify-dev libgconf-2-4 libnss3 libxss1 libasound2 xvfb\n\n            # Install\n            - echo PATH -- $PATH\n            - echo Installing source npm dependencies to $PWD\n            - cd $CODEBUILD_SRC_DIR/testing/cypress; npm install\n        pre_build:\n          commands:\n            - cd $CODEBUILD_SRC_DIR/testing/cypress\n            - |\n              if expr "${TEST_SERVER_URL}" : ".*\\w.*"; then\n                sed -i "s#static BASE_URL = .*#static BASE_URL = \'${TEST_SERVER_URL}\';#" ./cypress/support/common/constants.js ;\n                cat ./cypress/support/common/constants.js ;\n              fi\n        build:\n          commands:\n            - echo Testing started on `date`\n            - cd $CODEBUILD_SRC_DIR/testing/cypress\n            - echo Which cypress `which cypress`\n            - export DEBUG=\'cypress:*\'\n            - npx cypress version\n            - unset DEBUG\n            - echo Editing Cypress file at /root/.cache/Cypress/3.8.1/Cypress/resources/app/packages/server/config/app.yml\n            - |\n              if expr "${CYPRESS_DIRECTOR_URL}" : ".*\\w.*"; then\n                sed -i "s#api_url:.*\\"#api_url: \\"${CYPRESS_DIRECTOR_URL}\\"#" /root/.cache/Cypress/*/Cypress/resources/app/packages/server/config/app.yml ;\n                cat /root/.cache/Cypress/*/Cypress/resources/app/packages/server/config/app.yml ;\n              fi\n            - export BUILD_TAG=${CODEBUILD_SOURCE_VERSION}\n            - cd $CODEBUILD_SRC_DIR/testing/cypress; npm run-script parallel-test\n        post_build:\n          commands:\n            - echo Cypress testing completed on `date`\n\n')),Object(o.b)("p",null,"Here is what my cypress package.json has in it:"),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre"},'"parallel-test": "cross-env-shell node scripts/cypress.js --record --parallel --useAws --browser electron  --group electron --key d4dccb30-b3e4-4867-a2d2-892d9600106c --ciBuildId $BUILD_TAG --headless --uniqueId $CODEBUILD_BUILD_NUMBER",\n')),Object(o.b)("p",null,"And then in the cypress.js script, I have the following parameters passed into cypress:"),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre"},"      cypress.run({\n          browser: argv.browser,\n          spec: argv.spec,\n          record: argv.record,\n          group: argv.group,\n          headed: !argv.headless,\n          headless: argv.headless,\n          ciBuildId: argv.ciBuildId,\n          key: argv.key,\n          parallel: argv.parallel\n      }).catch((error) => {\n          console.error('Cypress errors: ', error);\n          process.exit(1);\n      }).then((results) => {\n")),Object(o.b)("h3",{id:"collecting-reports"},"Collecting reports"),Object(o.b)("p",null,"Here are a few other files my Cypress runs use. Since I don't really use Dashboard (just using Director), I still want to see a report of the results. With all of the jobs running on separate instances, my report merge command only has access to the local subset of tests. Also, I do not know if I am the 'last' machine running. It would be annoying to get 5-6 different emails about the same test results instead of one final email sent by the final process."),Object(o.b)("p",null,"One way to do this would be to have a new AWS Pipeline Stage setup that starts once all the tests are finished, and it grabs the data and sends it back. Instead, I added a little synchronization inside the cypress.js that uploads the unique machine id (",Object(o.b)("inlineCode",{parentName:"p"},"$CODEBUILD_BUILD_NUMBER")," is assigned to uniqueId) to AWS S3, and when the job finishes, I delete the unique machine id."),Object(o.b)("p",null,"If the cypress.js sees that all other unique machine ids are deleted, then there is a VERY good chance that we are the last Cypress process running. In that case, go ahead and download everyone else's test results, and run the merge command. Then email the results."),Object(o.b)("p",null,"I used to attach the merged single-file-html to the email, but now have it getting uploaded to a protected S3 bucket, and emailing a link to that...my link only works if you are authenticated on my website. So that url code wouldn't really work for others, but I'm leaving it in just to give an idea."),Object(o.b)("p",null,Object(o.b)("inlineCode",{parentName:"p"},"scripts/cypress.js")),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre"},"      require('dotenv').config();\n      const cypress = require('cypress');\n      const yargs = require('yargs');\n      const { merge } = require('mochawesome-merge');\n      const marge = require('mochawesome-report-generator');\n      const rm = require('rimraf');\n      const reporterConfig = require('../reporter');\n      const ls = require('ls');\n      const fs = require('fs');\n      const path = require('path');\n      const email = require('../cypress/support/helpers/contact');\n      const s3 = require('../cypress/support/helpers/awss3');\n\n      const argv = yargs.options({\n          'browser': {\n              alias: 'b',\n              type: 'string',\n              describe: 'Specify different browser to run tests in, either by name or by filesystem path',\n              default: 'chrome',\n              choices: ['chrome', 'electron']\n          },\n          'spec': {\n              alias: 's',\n              type: 'string',\n              describe: 'Specify the specs to run',\n              default: 'cypress/integration/**/*.feature'\n          },\n          'record': {\n              describe: 'Whether to record the test run',\n              type: 'boolean',\n              default: false\n          },\n          'key': {\n              describe: 'Specify your secret record key',\n              type: 'string',\n              default: undefined\n          },\n          'headless': {\n              describe: 'Hide the browser instead of running headed',\n              type: 'boolean',\n              default: false\n          },\n          'parallel': {\n              describe: 'Run recorded specs in parallel across multiple machines',\n              type: 'boolean',\n              default: false\n          },\n          'group': {\n              describe: 'Group recorded tests together under a single run name',\n              type: 'string',\n              default: undefined\n          },\n          'ciBuildId': {\n              describe: 'Specify a unique identifier for a run to enable grouping or parallelization',\n              type: 'string',\n              default: undefined\n          },\n          'uniqueId': {\n              describe: 'A unique identifier for this machine, used to synchronize reports on AWS',\n              type: 'string',\n              default: process.pid\n          },\n          'useAws': {\n              describe: 'Use AWS',\n              type: 'boolean',\n              default: false\n          }\n      }).help()\n        .argv\n\n      // Allow use of environment variables as well\n      argv.record = 'CYPRESS_RECORD' in process.env ? process.env.CYPRESS_RECORD : argv.record;\n      argv.key = 'CYPRESS_RECORD_KEY' in process.env ? process.env.CYPRESS_RECORD_KEY : argv.key;\n      argv.parallel = 'CYPRESS_PARALLEL' in process.env ? process.env.CYPRESS_PARALLEL : argv.parallel;\n      argv.group = 'CYPRESS_GROUP' in process.env ? process.env.CYPRESS_GROUP : argv.group;\n      argv.headless = 'CYPRESS_HEADLESS' in process.env ? process.env.CYPRESS_HEADLESS : argv.headless;\n      argv.ciBuildId = 'CYPRESS_CIBUILDID' in process.env ? process.env.CYPRESS_CIBUILDID : argv.ciBuildId;\n\n      // Ensure Parallel is setup correctly\n      if (argv.parallel) {\n          if (!argv.ciBuildId) {\n              // Set the ciBuildId based on current date\n              argv.ciBuildId = new Date().toISOString().slice(0,10);\n          }\n          if (!argv.group) {\n              argv.group = 'default';\n          }\n          console.log('API', 'Launching with ciBuildId: ' + argv.ciBuildId);\n      };\n\n      const reportDir = reporterConfig.mochawesomeReporterOptions.reportDir;\n      const reportFiles = path.join(reportDir, '*mochawesome*.json');\n      const reportGeneratorOptions = {\n          reportDir: reportDir,\n          files: [reportFiles],\n          saveHtml: true,\n          saveJson: true,\n          reportFilename: 'combinedReport',\n          inline: true\n      };\n      // list all of existing report files\n      ls(reportFiles, { recurse: true }, file => console.log(`removing ${file.full}`));\n\n      // delete all existing report files\n      rm(reportFiles, (error) => {\n          if (error) {\n              console.error(`Error while removing existing report files: ${error}`)\n              process.exit(1)\n          }\n          console.log('Removing all existing report files successfully!')\n      });\n\n      if (argv.useAws) {\n          initS3ForStartOfTesting(process.env.S3_BUCKET_NAME, argv.ciBuildId, argv.uniqueId);\n      }\n\n      cypress.run({\n          browser: argv.browser,\n          spec: argv.spec,\n          record: argv.record,\n          group: argv.group,\n          headed: !argv.headless,\n          headless: argv.headless,\n          ciBuildId: argv.ciBuildId,\n          key: argv.key,\n          parallel: argv.parallel\n      }).catch((error) => {\n          console.error('Cypress errors: ', error);\n          process.exit(1);\n      }).then((results) => {\n          // If this is a parallel build, upload all of the reports to S3\n          generateReport(reportGeneratorOptions, argv.useAws).then((reportResults) => {\n              const testsFailedToRun = !reportResults.report || !reportResults.report.stats;\n              const testFailures = testsFailedToRun ? 0 : reportResults.report.stats.failures;\n              if (testsFailedToRun) {\n                  console.log('Errors generating report');\n                  const dataToEmail = JSON.stringify(reportResults.report, null, 4);\n                  const htmlText = \"<html><body>Cypress tests Failed to Run on process \" + (argv.uniqueId ? argv.uniqueId : '') + \".<br>\" +\n                      \"<pre><code>\" + dataToEmail + \"</code></pre></body></html>\";\n                  email.sendEmail({\n                      subject: \"Cypress Tests Failed to Run\",\n                      html: htmlText\n                  });\n                  throw \"Failed to generate report\";\n              } else if (reportResults.HandleFinalReports) {\n                  const dataToEmail = JSON.stringify(reportResults.report.stats, null, 4);\n                  if (testFailures) {\n                      console.error(\"Total Failures: \" + reportResults.report.stats.failures);\n                      const htmlText = \"<html><body>Cypress tests FAILED: \" + reportResults.report.stats.failures + \".<br><br>\" +\n                          (argv.useAws\n                            ? \"<a href=\\\"https://my.website.com/s3_protected_access/latestReport.html\\\">See latest report for details</a><br><br>\"\n                            : \"See attachment for details<br><br>\") +\n                          \"<pre><code>\" + dataToEmail + \"</code></pre></body></html>\";\n                      email.sendEmail({\n                          subject: \"Cypress Tests Failed\",\n                          html: htmlText,\n                          attachmentFiles: argv.useAws ? [] : [reportHtmlLocation],\n                          callback: () => {process.exit(1)} // Ensure exit(1) so CodeBuild 'fails'\n                      });\n                  } else {\n                      const htmlText = \"<html><body>Cypress tests PASSED.<br><br>\" +\n                          (argv.useAws\n                              ? \"<a href=\\\"https://my.website.com/s3_protected_access/latestReport.html\\\">See latest report for details</a><br><br>\"\n                              : \"\") +\n                        \"<pre><code>\" + dataToEmail + \"</code></pre></body></html>\";\n                      email.sendEmail({\n                          subject: \"Cypress Tests Passed\",\n                          html: htmlText,\n                      });\n                  }\n              } else if (testFailures) {\n                  process.exit(1);\n              }\n          }).catch((error) => {\n              console.error('generateReport error', error);\n              process.exit(1);\n          });\n      });\n\n      async function initS3ForStartOfTesting(bucket, buildId, uniqueId) {\n          const prefix = 'TestResults/Cypress/' + buildId;\n          await s3.addProcessCounter(bucket, prefix, uniqueId);\n      };\n\n      async function finalizeS3AtEndOfTesting(bucket, buildId, uniqueId, reportDir) {\n          const prefix = 'TestResults/Cypress/' + buildId;\n          const jsonPrefix = prefix + '/json_';\n          const myProcessKeyPrefix = jsonPrefix + uniqueId + '_';\n          // Upload my report files\n          const localReportFiles = fs.readdirSync(reportDir);\n          for (const reportFile of localReportFiles) {\n              if (!reportFile.startsWith('mochawesome') || !reportFile.endsWith('.json')) {\n                  continue;\n              }\n              const fullLocalFileName = path.join(reportDir, reportFile);\n              const s3FileName = myProcessKeyPrefix + reportFile;\n              await s3.uploadFile(fullLocalFileName, bucket, s3FileName);\n          }\n          const processNumber = await s3.removeProcessCounter(bucket, prefix, uniqueId);\n          if (processNumber > 0) {\n              return processNumber;\n          }\n          // We are likely the last process running, so download all other process reports,\n          // so they can be merged into one report\n          const filesOnS3 = await s3.listFiles(bucket, jsonPrefix);\n          if (filesOnS3.$response.error) {\n              console.error('Error getting files from S3', filesOnS3.$response.error);\n              return processNumber;\n          }\n          for (const s3ReportFile of filesOnS3.Contents) {\n              if (s3ReportFile.Key.startsWith(myProcessKeyPrefix)) {\n                  continue;\n              }\n              const fullLocalFileName = path.join(reportDir, s3ReportFile.Key.split('/').pop());\n              await s3.downloadFile(fullLocalFileName, bucket, s3ReportFile.Key);\n          }\n          return processNumber;\n      };\n\n      async function generateReport(options, useAws) {\n          let totalProcessesLeft = 0;\n          if (useAws) {\n              totalProcessesLeft = await finalizeS3AtEndOfTesting(process.env.S3_BUCKET_NAME, argv.ciBuildId, argv.uniqueId, reportDir);\n          }\n          const handleFinalReports = totalProcessesLeft == 0;\n          return merge(options).catch((error) => {\n              console.error('Errors Merging', error);\n          }).then(async (report) => {\n              const reportFiles = await marge.create(report, options);\n              const reportHtmlLocation = path.join(reportGeneratorOptions.reportDir, reportGeneratorOptions.reportFilename + '.html');\n              if (useAws && handleFinalReports) {\n                  const s3Key = \"TestResults/Cypress/latestReport.html\";\n                  await s3.uploadFile(reportHtmlLocation, process.env.S3_BUCKET_NAME, s3Key);\n              }\n              return { report: report, Files: reportFiles, mergedReport: reportHtmlLocation, HandleFinalReports: handleFinalReports};\n          });\n      }\n")),Object(o.b)("p",null,Object(o.b)("inlineCode",{parentName:"p"},"helpers/awss3.js")),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre"},"      const AWS = require(\"aws-sdk\");\n      const fs = require(\"fs\");\n\n      AWS.config.update({\n        accessKeyId: process.env.AWS_ACCESS_KEY_ID,\n        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,\n        region: process.env.AWS_REGION,\n      });\n\n      const s3 = new AWS.S3({apiVersion: '2006-03-01'});\n\n      const uploadFile = async (filePath, bucket, key) => {\n        const params = {\n          Bucket: bucket,\n          Key: key,\n          ContentType: 'binary',\n          ContentEncoding: 'utf8',\n          CacheControl: 'max-age=172800'\n        };\n\n        const fileData = fs.readFileSync(filePath);\n        console.log(\"Preparing to upload '\" + filePath + \"' to AWS S3 bucket: \" + bucket);\n        params.Body = fileData;\n        return s3.putObject(params, (err, result) => {\n          if (err) {\n            console.err(\"Error uploading to S3\", err);\n          } else {\n            console.log(\" - Finished uploading '\" + key + \"'\");\n          }\n          return result;\n        }).promise();\n      };\n\n      const createFile = async (bucket, key, data) => {\n        return s3.putObject({\n          Bucket: bucket,\n          Key: key,\n          Body: data\n        }, (err, result) => {\n          if (err) {\n            console.err(\"Error uploading to S3\", err);\n          } else {\n            console.log(\" - Finished Creating File '\" + key + \"'\");\n          }\n          return result;\n        }).promise();\n      };\n\n      const getObject = async (bucket, objectKey) => {\n        try {\n          const params = {\n            Bucket: bucket,\n            Key: objectKey\n          };\n\n          const data = await s3.getObject(params).promise();\n\n          if (data.Body) {\n            return data;\n          } else if (data.$response.error) {\n            throw new Error(`Could not retrieve file from AWS S3: ${data.$response.error}`);\n          }\n        } catch (e) {\n          throw new Error(`Could not retrieve file from S3: ${e.message}`);\n        }\n      };\n\n      const downloadFile = async (filePath, bucket, key) => {\n        return getObject(bucket, key).then((data) => {\n          if (data && data.Body) {\n            fs.writeFileSync(filePath, data.Body);\n          }\n        }).catch((err) => {\n          console.log('Error writing file to (' + filePath + ')', err);\n        });\n      };\n\n      const getSignedUrl = (bucket, objectKey) => {\n        const params = {\n          Bucket: bucket,\n          Key: objectKey\n        };\n        const data = s3.getSignedUrl('getObject', params);\n        return data;\n      };\n\n      const listFiles = async (bucket, prefix) => {\n        try {\n          const data = await s3.listObjectsV2({\n            Bucket: bucket,\n            Prefix: prefix, // Limits response to keys that begin with specified prefix\n          }).promise();\n\n          if (data.$response.error) {\n            throw new Error(`Could not list files in S3: ${data.$response.error}`);\n          }\n          return data;\n        } catch (e) {\n          throw new Error(`Could not list files in S3: ${e.message}`);\n        }\n      };\n\n      // addProcessCounter - Adds a 'lock' file in S3 for use in counting how many active\n      // processes are working on the tests\n      const addProcessCounter = async (bucket, prefix, uniqueId) => {\n        const lockPrefix = prefix + (prefix.endsWith('/') ? '' : '/') + 'lock.';\n        const lockKey = lockPrefix + uniqueId;\n        return await createFile(bucket, lockKey);\n      }\n\n      // removeProcessCounter - Removes our 'lock' file in S3, and returns the number of\n      // remaining lock files in S3.\n      const removeProcessCounter = async (bucket, prefix, uniqueId) => {\n        const lockPrefix = prefix + (prefix.endsWith('/') ? '' : '/') + 'lock.';\n        const lockKey = lockPrefix + uniqueId;\n        try {\n          let data = await s3.deleteObject({\n            Bucket: bucket,\n            Key: lockKey\n          }).promise();\n\n          if (data.$response.error) {\n            throw new Error(`Could not list files in S3: ${data.$response.error}`);\n          }\n\n          data = await listFiles(bucket, lockPrefix);\n          return data && data.Contents ? data.Contents.length : 0;\n        } catch (e) {\n          throw new Error(`Could not list files in S3: ${e.message}`);\n        }\n      }\n\n      module.exports = {uploadFile, downloadFile, getObject, getSignedUrl, listFiles, createFile, addProcessCounter, removeProcessCounter};\n")),Object(o.b)("p",null,Object(o.b)("inlineCode",{parentName:"p"},"helpers/contact.js")),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre"},"      const AWS = require('aws-sdk');\n      const nodemailer = require('nodemailer');\n\n      AWS.config.update({\n        accessKeyId: process.env.AWS_ACCESS_KEY_ID,\n        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,\n        region: process.env.AWS_REGION,\n      });\n\n\n      const transporter = nodemailer.createTransport({\n        SES: new AWS.SES({apiVersion: '2010-12-01'})\n      });\n\n      // sendEmail config:\n      //   subject: \"Cypress Tests Failed\",\n      //   text: \"hello world!\",\n      //   html: \"<b>hello world!</b>\",\n      //   attachmentFiles: [pathToAttachment],\n      //   to: undefined, // Defaults to process.env.TO_EMAIL\n      //   from: undefined, // Defaults to process.env.FROM_EMAIL\n      //   callback: () => {process.exit(1)}\n      const sendEmail = (config) => {\n        if (!config) {\n          console.error(\"Must pass in config to sendEmail\");\n          return;\n        }\n        if (!process.env.EMAIL_ON_AWS) {\n          if (config.callback) {\n            config.callback();\n          }\n          return;\n        }\n\n        const toAddress = config.to ? config.to : process.env.TO_EMAIL;\n        const toAddresses = Array.isArray(toAddress) ? toAddress : toAddress.split(\";\");\n        const fromAddress = config.from ? config.from : process.env.FROM_EMAIL;\n\n        const message = {\n          bcc: toAddresses,\n          subject: config.subject,\n          text: config.text,\n          html: config.html,\n          from: fromAddress,\n          sender: fromAddress\n        };\n\n        if (config.attachmentFiles && config.attachmentFiles.length > 0) {\n          message.attachments = config.attachmentFiles.reduce( (attachments, filePath) => {\n            attachments.push({\n              filename: filePath.replace(/^.*(\\\\|\\/|\\:)/,''),\n              path: filePath,\n              cid: filePath.replace(/\\s+/, '_') + '@my_unique_id.com'\n            });\n            return attachments;\n          }, []);\n        }\n\n        transporter.sendMail(message, (error, info) => {\n          if (error) {\n              console.log('Error occurred');\n              console.log(error.message);\n              return process.exit(1);\n          }\n\n          console.log('Message sent successfully!');\n          console.log(nodemailer.getTestMessageUrl(info));\n\n          // only needed when using pooled connections\n          transporter.close();\n\n          if (config.callback) {\n            config.callback();\n          }\n        });\n      }\n\n      module.exports = {sendEmail};\n\n")))}void 0!==p&&p&&p===Object(p)&&Object.isExtensible(p)&&!p.hasOwnProperty("__filemeta")&&Object.defineProperty(p,"__filemeta",{configurable:!0,value:{name:"MDXContent",filename:"src/ci/aws-codebuild-a.mdx"}}),p.isMDXComponent=!0}}]);
//# sourceMappingURL=component---src-ci-aws-codebuild-a-mdx-ce4251f311f25c0b40d2.js.map