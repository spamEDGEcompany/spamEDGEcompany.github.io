---
layout: default
title: News
---

<div style="padding:48px 24px; max-width:900px; margin:auto;">

<h1 style="color:#1a2b4c;">News & Updates</h1>

<p style="font-size:17px; line-height:1.7; color:#555;">
Stay up to date with SpamEDGE Company's announcements, project milestones, and industry insights.
</p>

{% for post in site.posts %}

<article style="margin-top:40px; padding-bottom:32px; border-bottom:1px solid #ddd;">

<h2 style="color:#1a2b4c; margin-bottom:8px;">
<a href="{{ post.url }}" style="color:#1a2b4c; text-decoration:none;">
{{ post.title }}
</a>
</h2>

<p style="color:#777; font-size:14px;">
{{ post.date | date: "%d %B %Y" }}
</p>

<div style="font-size:16px; line-height:1.7; color:#333;">
{{ post.excerpt }}
</div>

<a href="{{ post.url }}"
style="display:inline-block; margin-top:15px; background:#1a2b4c; color:#fff; padding:10px 20px; text-decoration:none; font-weight:700;">
READ MORE
</a>

</article>

{% endfor %}

</div>
---

[← Back to Home](/)
