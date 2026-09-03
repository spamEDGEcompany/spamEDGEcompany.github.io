---
layout: default
title: Actualités
lang: fr
---

<div style="padding:48px 24px; max-width:900px; margin:auto;">

<h1 style="color:#1a2b4c;">Actualités et Mises à Jour</h1>

<p style="font-size:17px; line-height:1.7; color:#555;">
Restez informé des annonces, des étapes de projets et des actualités de SpamEDGE Company.
</p>

{% for post in site.fr_posts %}

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
LIRE PLUS
</a>

</article>

{% else %}

<p style="font-style:italic; color:#777; margin-top:40px;">
(Les actualités seront publiées ici au fur et à mesure de leur disponibilité)
</p>

{% endfor %}

</div>

[← Retour à l'Accueil](/fr/)
