---
title: How I built my website
date: 2020-02-08T11:00:00
layout: post
draft: false
category: tech
tags:
  - introduction
  - tech
  - web
  - AWS
description: Web dev stack I use in 2020 (Gatsby + Amplify + S3)
---
I have owned igorstar.com domain since 2012 and my website went through multiple revisions (at least 3). And here in 2020 I would like to introduce my 4th version of my website, 100% setup by myself. That was a fun experience and some of you may find it helpful.

## GatsbyJS

Is an open source framework for building static web sites while keeping React features. This makes it super fast, lightweight, SEO friendly and best development experience.

[Gatsby](https://www.gatsbyjs.org/) has a bunch of starters to select from that cover the majority of use cases. Also it's plugin based, which means you no longer need to configure the build on low level as much as you would need in a common single page application. Though something that's not so common can be a challenge to set up. But the documentation is on top — take a look [here](https://www.gatsbyjs.org/docs/) if you haven't seen it yet.

## Amplify

[AWS Amplify](https://aws.amazon.com/amplify/) is an Amazon service that can be used to build static web applications. And it has full support for GatsbyJS. It directly pulls from a GitHub branch and can deploy to different subdomains that can be used as separate environemnts.

Before switching to AWS, the average costs of running my static website was about $16 per month, which includes domain, hosting and email. AWS allows to manage all that from one console at a much lower price: $4.95 a month. Most of it is for [WorkMail](https://aws.amazon.com/workmail/) service, so if you don't need an email box you could drop the costs to be close to $1 per month for [Route53](https://aws.amazon.com/route53/) domain management.

When using Amplify you pay only for the underlying AWS services you use. There are no additional charges for using the Amplify Framework.

## S3

Because my website is image heavy, it was critical to optimize the storage of my photos in [AWS S3](https://aws.amazon.com/s3/) rather than keeping the assets in source. Luckily Gatsby has a plugin [gatsby-source-s3-image](https://www.gatsbyjs.org/packages/gatsby-source-s3-image/) that pulls all images from S3 on build time and makes them available through Gatsby's GraphQL layer <b>including *EXIF* metadata!</b>. Caching the images on build time allows to benefit from [gatsby-plugin-sharp](https://www.gatsbyjs.org/packages/gatsby-plugin-sharp) image processing and optimize for mobile devices. Also it helps avoid unexpected S3 bills, just make sure you don't go beyond the free tier (Currently 5GB).

Talking about photos, don't forget to check out my [gallery](/gallery)

If you are curious to see the codes for this project, it's open source on [my GitHub](https://github.com/igor-starostenko/igorstar).

Thanks!
