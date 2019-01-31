using System;
using AutoMapper;
using MarcellTothNet.Services.Article.Api.Models;

namespace MarcellTothNet.Services.Article.Api.Contract.Mapping
{
    public class MapperProfile : Profile
    {
        public MapperProfile()
        {
            CreateMap<ArticleTag, int>().ConvertUsing(at => at.TagId);

            CreateMap<Models.Article, ArticleDto>()
                .ForMember(dto => dto.Tags, expression => expression.MapFrom(a => a.ArticleTags))
                .ReverseMap()
                .ForMember(
                    a => a.ArticleTags, 
                    expr => expr.MapFrom<DtoToArticleTagResolver>())
                .AfterMap<DtoToArticleTagResolver.SetArticleTagAction>();
        }
    }
}